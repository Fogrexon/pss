import { VNode, WorkUnit } from '../types';

/**
 * Interface for the differ.
 * Compares the old and new VNode trees to extract changes.
 */
export interface IDiffer {
    /**
     * Compares the old and new VNode trees and identifies changes.
     * @param newVNode The new VNode.
     * @param oldVNode The old VNode.
     * @returns A list of work units representing the changes.
     */
    diff(newVNode: VNode | null, oldVNode: VNode | null): WorkUnit[];
}

/**
 * Implementation class for the diffing algorithm.
 * Compares old and new VNode trees to detect changes.
 */
export class Differ implements IDiffer {
    /**
     * Compares the old and new VNode trees and identifies changes.
     * @param newVNode The new VNode.
     * @param oldVNode The old VNode.
     * @returns A list of work units representing the changes.
     */
    diff(newVNode: VNode | null, oldVNode: VNode | null): WorkUnit[] {
        const workUnits: WorkUnit[] = [];

        // Note: This is a simplified implementation handling common cases.
        // A full implementation would also handle recursive comparison of child nodes
        // and detection of element moves using keys.

        // Case 1: No old node, new node exists (Creation)
        if (oldVNode === null && newVNode !== null) {
            this.createWorkUnit(workUnits, 'PLACEMENT', newVNode);
            return workUnits;
        }

        // Case 2: No new node, old node exists (Deletion)
        if (newVNode === null && oldVNode !== null) {
            this.createWorkUnit(workUnits, 'DELETION', oldVNode);
            return workUnits;
        }

        // Case 3: Both nodes exist
        if (newVNode !== null && oldVNode !== null) {
            // If types differ, delete the old node and create the new one
            if (newVNode.type !== oldVNode.type) {
                this.createWorkUnit(workUnits, 'DELETION', oldVNode);
                this.createWorkUnit(workUnits, 'PLACEMENT', newVNode);
                return workUnits;
            }

            // If types are the same, update
            this.createWorkUnit(workUnits, 'UPDATE', newVNode, oldVNode);

            // Reconcile children using key-based comparison
            this.reconcileChildren(workUnits, newVNode, oldVNode);
        }

        return workUnits;
    }

    /**
     * Detects differences in child elements and generates WorkUnits.
     * Efficiently handles element moves and additions/deletions using keys.
     * Based on reconciliation algorithms like the one used in React.
     * @param workUnits The list to add generated work units to.
     * @param newParentVNode The new parent VNode.
     * @param oldParentVNode The old parent VNode.
     */
    private reconcileChildren(workUnits: WorkUnit[], newParentVNode: VNode, oldParentVNode: VNode): void {
        const oldChildren = oldParentVNode.props.children || [];
        const newChildren = newParentVNode.props.children || [];

        let oldStartIndex = 0;
        let newStartIndex = 0;
        let oldEndIndex = oldChildren.length - 1;
        let newEndIndex = newChildren.length - 1;
        let oldStartNode = oldChildren[oldStartIndex];
        let newStartNode = newChildren[newStartIndex];
        let oldEndNode = oldChildren[oldEndIndex];
        let newEndNode = newChildren[newEndIndex];

        let oldKeyMap: Map<string | number, number> | null = null;

        // Main comparison loop
        while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
            if (oldStartNode === undefined) {
                oldStartNode = oldChildren[++oldStartIndex];
            } else if (oldEndNode === undefined) {
                oldEndNode = oldChildren[--oldEndIndex];
            } else if (this.isSameVNode(oldStartNode, newStartNode)) {
                // Case 1: Start nodes match
                const childWorkUnits = this.diff(newStartNode, oldStartNode);
                workUnits.push(...childWorkUnits);
                oldStartNode = oldChildren[++oldStartIndex];
                newStartNode = newChildren[++newStartIndex];
            } else if (this.isSameVNode(oldEndNode, newEndNode)) {
                // Case 2: End nodes match
                const childWorkUnits = this.diff(newEndNode, oldEndNode);
                workUnits.push(...childWorkUnits);
                oldEndNode = oldChildren[--oldEndIndex];
                newEndNode = newChildren[--newEndIndex];
            } else if (this.isSameVNode(oldStartNode, newEndNode)) {
                // Case 3: Old start matches new end (indicates a move)
                const childWorkUnits = this.diff(newEndNode, oldStartNode);
                workUnits.push(...childWorkUnits);
                // Placement with nextSibling in Committer handles the positioning
                oldStartNode = oldChildren[++oldStartIndex];
                newEndNode = newChildren[--newEndIndex];
            } else if (this.isSameVNode(oldEndNode, newStartNode)) {
                // Case 4: Old end matches new start (indicates a move)
                const childWorkUnits = this.diff(newStartNode, oldEndNode);
                workUnits.push(...childWorkUnits);
                // Placement with nextSibling in Committer handles the positioning
                oldEndNode = oldChildren[--oldEndIndex];
                newStartNode = newChildren[++newStartIndex];
            } else {
                // Cases 1-4 failed, use key map for lookup
                if (!oldKeyMap) {
                    oldKeyMap = this.createKeyMap(oldChildren, oldStartIndex, oldEndIndex);
                }

                const key = newStartNode.props.key;
                const indexInOld = key !== undefined ? oldKeyMap.get(key) : undefined;

                if (indexInOld === undefined) {
                    // New node, create it
                    const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                    this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, undefined, nextSibling);
                } else {
                    // Node with same key found in old list
                    const nodeToMove = oldChildren[indexInOld];
                    if (this.isSameVNode(nodeToMove, newStartNode)) {
                        const childWorkUnits = this.diff(newStartNode, nodeToMove);
                        workUnits.push(...childWorkUnits);
                        oldChildren[indexInOld] = undefined as any; // Mark as processed
                        const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                        // Add PLACEMENT work unit for the potentially moved node to ensure correct positioning.
                        // The Committer will handle the actual move or update based on instance presence.
                        this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, nodeToMove, nextSibling);
                    } else {
                        // Key matches but type doesn't, treat as a new node placement
                        const nextSibling = this.findNextSiblingVNode(newChildren, newStartIndex + 1);
                        this.createWorkUnit(workUnits, 'PLACEMENT', newStartNode, undefined, nextSibling);
                    }
                }
                newStartNode = newChildren[++newStartIndex];
            }
        }

        // Handle remaining nodes
        if (oldStartIndex > oldEndIndex) {
            // Add remaining new nodes
            for (let i = newStartIndex; i <= newEndIndex; i++) {
                const nextSibling = this.findNextSiblingVNode(newChildren, i + 1);
                this.createWorkUnit(workUnits, 'PLACEMENT', newChildren[i], undefined, nextSibling);
            }
        } else if (newStartIndex > newEndIndex) {
            // Remove remaining old nodes
            for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                if (oldChildren[i]) {
                    this.createWorkUnit(workUnits, 'DELETION', oldChildren[i]);
                }
            }
        }
    }

    /**
     * Checks if two VNodes are the same type and have the same key.
     * @param vnode1 The first VNode.
     * @param vnode2 The second VNode.
     * @returns True if they are the same VNode type and key, false otherwise.
     */
    private isSameVNode(vnode1: VNode, vnode2: VNode): boolean {
        return vnode1.type === vnode2.type && vnode1.props.key === vnode2.props.key;
    }

    /**
     * Creates a map of keys to indices for children within a specified range.
     * @param children The array of child VNodes.
     * @param startIndex The starting index of the range.
     * @param endIndex The ending index of the range.
     * @returns A Map where keys are VNode keys and values are their indices.
     */
    private createKeyMap(children: VNode[], startIndex: number, endIndex: number): Map<string | number, number> {
        const map = new Map<string | number, number>();
        for (let i = startIndex; i <= endIndex; i++) {
            const child = children[i];
            if (child?.props?.key !== undefined) {
                map.set(child.props.key, i);
            }
        }
        return map;
    }


    /**
     * Creates a WorkUnit and adds it to the list.
     * @param workUnits The list of work units.
     * @param effectTag The type of operation ('PLACEMENT', 'UPDATE', 'DELETION').
     * @param vnode The VNode associated with the work unit.
     * @param alternate The corresponding old VNode (for UPDATE and DELETION).
     * @param nextSibling The next sibling VNode in the new children list (for PLACEMENT).
     */
    private createWorkUnit(
        workUnits: WorkUnit[],
        effectTag: 'PLACEMENT' | 'UPDATE' | 'DELETION',
        vnode: VNode,
        alternate?: VNode,
        nextSibling?: VNode | null
    ): void {
        workUnits.push({
            vnode,
            effectTag,
            alternate,
            nextSibling
        } as WorkUnit);
    }

    /**
     * Finds the next sibling VNode starting from a given index that is expected
     * to have a corresponding rendered instance (e.g., a PixiJS object).
     * This is used as an anchor for inserting new elements.
     * @param children The list of new children VNodes.
     * @param startIndex The index to start searching from.
     * @returns The next sibling VNode with a potential instance, or null if none found.
     */
    private findNextSiblingVNode(children: VNode[], startIndex: number): VNode | null {
        for (let i = startIndex; i < children.length; i++) {
            const child = children[i];
            // This assumes the Committer will verify if the VNode actually has an instance.
            // For the Differ's purpose, returning the next VNode is sufficient.
            if (child) {
                return child;
            }
        }
        return null;
    }
}

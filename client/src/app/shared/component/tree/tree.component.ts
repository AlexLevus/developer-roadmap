import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
	MatTreeFlatDataSource,
	MatTreeFlattener
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { TreeFlatNode } from "@data/models/treeFlatNode";
import { TreeNode } from "@data/models/treeNode";

@Component({
	selector: "app-tree",
	templateUrl: "./tree.component.html",
	styleUrls: ["./tree.component.scss"]
})
export class TreeComponent implements OnInit {
	@Output() saveItem: EventEmitter<TreeNode> = new EventEmitter();
	@Output() toggleItemProgress: EventEmitter<{
		id: string[];
		isCompleted: boolean;
	}> = new EventEmitter();
	@Output() deleteItems: EventEmitter<string[]> = new EventEmitter();
	@Input() isViewMode = true;
	@Input() isEditMode = true;
	@Input() dataChange: BehaviorSubject<TreeNode[]> = new BehaviorSubject<
		TreeNode[]
	>([]);

	treeControl: FlatTreeControl<TreeFlatNode>;

	treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;

	dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

	checklistSelection = new SelectionModel<TreeFlatNode>(true);

	flatNodeMap = new Map<TreeFlatNode, TreeNode>();

	nestedNodeMap = new Map<TreeNode, TreeFlatNode>();

	constructor() {
		this.treeFlattener = new MatTreeFlattener(
			this.transformer,
			this.getLevel,
			this.isExpandable,
			this.getChildren
		);

		this.treeControl = new FlatTreeControl<TreeFlatNode>(
			this.getLevel,
			this.isExpandable
		);

		this.dataSource = new MatTreeFlatDataSource(
			this.treeControl,
			this.treeFlattener
		);
	}

	ngOnInit(): void {
		this.dataChange.subscribe((data) => {
			this.dataSource.data = data;
		});
	}

	getLevel = (node: TreeFlatNode) => node.level;

	isExpandable = (node: TreeFlatNode) => node.expandable;

	getChildren = (node: TreeNode): TreeNode[] => node.children;

	hasChild = (_: number, nodeData: TreeFlatNode) =>
		nodeData.expandable || this.isEditMode;

	hasNoContent = (_: number, nodeData: TreeFlatNode) => nodeData.name === "";

	transformer = (node: TreeNode, level: number) => {
		const existingNode = this.nestedNodeMap.get(node);
		const flatNode =
			existingNode && existingNode.name === node.name
				? existingNode
				: ({} as TreeFlatNode);
		flatNode.path = node.path;
		flatNode.name = node.name;
		flatNode.level = level;
		flatNode.expandable = !!node.children?.length;
		flatNode.children = node.children;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		if (node.isCompleted) {
			this.checklistSelection.select(flatNode);
		}

		if (flatNode.children) {
			const isAllChildrenCompleted = this.flatten(flatNode.children).every(
				(item) => item.isCompleted || item.children?.length !== 0
			);

			if (flatNode.children.length !== 0 && isAllChildrenCompleted) {
				this.todoLeafItemSelectionToggle(flatNode);
			}
		}

		return flatNode;
	};

	private flatten = (children: TreeNode[]): TreeNode[] =>
		Array.prototype.concat.apply(
			children,
			children.map((item) => this.flatten(item.children || []))
		);

	descendantsAllSelected(node: TreeFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		return (
			descendants.length > 0 &&
			descendants.every((child) => {
				return this.checklistSelection.isSelected(child);
			})
		);
	}

	descendantsPartiallySelected(node: TreeFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some((child) =>
			this.checklistSelection.isSelected(child)
		);
		return result && !this.descendantsAllSelected(node);
	}

	todoItemSelectionToggle(flatNode: TreeFlatNode): void {
		this.checklistSelection.toggle(flatNode);
		const descendants = this.treeControl.getDescendants(flatNode);
		this.checklistSelection.isSelected(flatNode)
			? this.checklistSelection.select(...descendants)
			: this.checklistSelection.deselect(...descendants);

		descendants.forEach((child) => this.checklistSelection.isSelected(child));
		this.checkAllParentsSelection(flatNode);
		this.toggleProgress(
			flatNode.children.length === 0
				? [this.flatNodeMap.get(flatNode)]
				: this.flatten(flatNode.children),
			this.checklistSelection.isSelected(flatNode)
		);

		if (flatNode.children) {
			const isAllChildrenCompleted = this.flatten(flatNode.children).every(
				(item) => item.isCompleted || item.children?.length !== 0
			);

			if (flatNode.children.length !== 0 && isAllChildrenCompleted) {
				this.todoLeafItemSelectionToggle(flatNode);
			}
		}
	}

	todoLeafItemSelectionToggle(flatNode: TreeFlatNode): void {
		this.checklistSelection.toggle(flatNode);
		this.checkAllParentsSelection(flatNode);
		const node = this.flatNodeMap.get(flatNode);
		this.toggleProgress([node], this.checklistSelection.isSelected(flatNode));
	}

	checkAllParentsSelection(node: TreeFlatNode): void {
		let parent: TreeFlatNode | null = this.getParentNode(node);
		while (parent) {
			this.checkRootNodeSelection(parent);
			parent = this.getParentNode(parent);
		}
	}

	checkRootNodeSelection(node: TreeFlatNode): void {
		const nodeSelected = this.checklistSelection.isSelected(node);
		const descendants = this.treeControl.getDescendants(node);
		const descAllSelected =
			descendants.length > 0 &&
			descendants.every((child) => {
				return this.checklistSelection.isSelected(child);
			});
		if (nodeSelected && !descAllSelected) {
			this.checklistSelection.deselect(node);
		} else if (!nodeSelected && descAllSelected) {
			this.checklistSelection.select(node);
		}
	}

	getParentNode(node: TreeFlatNode): TreeFlatNode | null {
		const currentLevel = this.getLevel(node);

		if (currentLevel < 1) {
			return null;
		}

		const startIndex = this.treeControl.dataNodes?.indexOf(node) - 1;

		for (let i = startIndex; i >= 0; i--) {
			const currentNode = this.treeControl.dataNodes[i];

			if (this.getLevel(currentNode) < currentLevel) {
				return currentNode;
			}
		}
		return null;
	}

	private getNewPath(
		lastChildren: TreeNode | null,
		parentNode: TreeNode
	): string {
		if (lastChildren) {
			const { path } = lastChildren;
			const newLastNumber = +path.slice(-1) + 1;
			return path.slice(0, path.length - 1) + newLastNumber;
		}

		return parentNode.path + ".1";
	}

	addNewItem(node: TreeFlatNode) {
		const parentNode = this.flatNodeMap.get(node);

		if (parentNode) {
			const lastChildren = parentNode.children
				? parentNode.children[parentNode.children.length - 1]
				: null;
			const isNewInputPresent = lastChildren?.name === "";

			if (!lastChildren) {
				parentNode.children = [];
			}

			if (!isNewInputPresent) {
				parentNode.children.push({
					name: "",
					path: this.getNewPath(lastChildren, parentNode)
				} as TreeNode);

				this.dataChange.next(this.dataChange.value);
			}
		}
		this.treeControl.expand(node);
	}

	deleteItem(node: TreeFlatNode) {
		const parentNode = this.getParentNode(node);
		const flatNode = this.flatNodeMap.get(node);

		if (parentNode) {
			const parentFlat = this.flatNodeMap.get(parentNode);

			if (parentFlat?.children) {
				parentFlat.children = parentFlat.children.filter(
					(item) => item.path !== node.path
				);
				this.dataChange.next(this.dataChange.value);
			}
		} else {
			this.dataChange.next(
				this.dataChange.value.filter((item) => item.path !== node.path)
			);
		}

		const stageIds = [
			flatNode?.id!,
			...this.flatten(flatNode?.children || []).map((item) => item.id)
		];

		this.deleteItems.emit(stageIds);
	}

	save(flatNode: TreeFlatNode, value: string) {
		const node = this.flatNodeMap.get(flatNode);
		if (node) {
			node.name = value;
			this.saveItem.emit(node);
			this.dataChange.next(this.dataChange.value);
		}
	}

	toggleProgress(node: Array<TreeNode | undefined>, isCompleted: boolean) {
		if (node) {
			const id = node.map((item) => item!.id);
			this.toggleItemProgress.emit({ id, isCompleted });
		}
	}
}

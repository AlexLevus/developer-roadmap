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
		this.dataChange.subscribe(data => {
			this.dataSource.data = data;
		});
	}

	getLevel = (node: TreeFlatNode) => node.level;

	isExpandable = (node: TreeFlatNode) => node.expandable;

	getChildren = (node: TreeNode): TreeNode[] => node.children;

	hasChild = (_: number, nodeData: TreeFlatNode) => nodeData.expandable;

	hasNoContent = (_: number, nodeData: TreeFlatNode) => nodeData.name === "";

	transformer = (node: TreeNode, level: number) => {
		const existingNode = this.nestedNodeMap.get(node);
		const flatNode =
			existingNode && existingNode.name === node.name
				? existingNode
				: ({} as TreeFlatNode);
		flatNode.name = node.name;
		flatNode.level = level;
		flatNode.expandable = !!node.children?.length;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	};

	descendantsAllSelected(node: TreeFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		return (
			descendants.length > 0 &&
			descendants.every(child => {
				return this.checklistSelection.isSelected(child);
			})
		);
	}

	descendantsPartiallySelected(node: TreeFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some(child =>
			this.checklistSelection.isSelected(child)
		);
		return result && !this.descendantsAllSelected(node);
	}

	todoItemSelectionToggle(node: TreeFlatNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		this.checklistSelection.isSelected(node)
			? this.checklistSelection.select(...descendants)
			: this.checklistSelection.deselect(...descendants);

		descendants.forEach(child => this.checklistSelection.isSelected(child));
		this.checkAllParentsSelection(node);
	}

	todoLeafItemSelectionToggle(node: TreeFlatNode): void {
		this.checklistSelection.toggle(node);
		this.checkAllParentsSelection(node);
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
			descendants.every(child => {
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

		const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

		for (let i = startIndex; i >= 0; i--) {
			const currentNode = this.treeControl.dataNodes[i];

			if (this.getLevel(currentNode) < currentLevel) {
				return currentNode;
			}
		}
		return null;
	}

	private getNewPath(path: string): string {
		const newLastNumber = +path.slice(-1) + 1;
		return path.slice(0, path.length - 1) + newLastNumber;
	}

	addNewItem(node: TreeFlatNode) {
		const parentNode = this.flatNodeMap.get(node);

		if (parentNode) {
			const lastChildren = parentNode.children[parentNode.children.length - 1];
			const isNewInputPresent = lastChildren.name === "";

			if (!isNewInputPresent) {
				parentNode.children.push({
					name: "",
					path: this.getNewPath(lastChildren.path)
				} as TreeNode);

				this.dataChange.next(this.dataChange.value);
			}
		}
		this.treeControl.expand(node);
	}

	save(flatNode: TreeFlatNode, value: string) {
		const node = this.flatNodeMap.get(flatNode);
		if (node) {
			node.name = value;
			this.saveItem.emit(node);
			this.dataChange.next(this.dataChange.value);
		}
	}
}

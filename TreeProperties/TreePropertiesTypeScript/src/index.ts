export function calculateTreeProperties(parents: number[]): [number, number] {
    const n = parents.length;
    if (n === 0) return [0, 0];
    if (n === 1) return [0, 1];  // Special case for single node
    
    const children: number[][] = Array.from({ length: n }, () => []);
    
    // Build the tree structure
    let root = -1;
    for (let i = 0; i < n; i++) {
        if (parents[i] === -1) {
            root = i;
        } else {
            children[parents[i]].push(i);
        }
    }
    
    let leafCount = 0;
    function dfs(node: number): number {
        if (children[node].length === 0) {
            leafCount++;
            return 0;
        }
        let maxChildHeight = 0;
        for (const child of children[node]) {
            maxChildHeight = Math.max(maxChildHeight, 1 + dfs(child));
        }
        return maxChildHeight;
    }
    const height = dfs(root);
    return [height, leafCount];
}

// Helper function to create a perfect binary tree parent array
export function createPerfectBinaryTreeParents(size: number): number[] {
    const parents = new Array(size).fill(-1);
    
    // For a perfect binary tree, each node i (except root) has parent floor((i-1)/2)
    for (let i = 1; i < size; i++) {
        parents[i] = Math.floor((i - 1) / 2);
    }
    
    return parents;
}

// Example usage
if (require.main === module) {
    // Example 1: Simple tree
    const example1 = [5, 2, 5, 2, 1, -1, 5, 0];
    const [height1, leafCount1] = calculateTreeProperties(example1);
    console.log('Example 1:');
    console.log(`Height: ${height1}`);
    console.log(`Leaf count: ${leafCount1}`);
    console.log(`Parents array: ${example1.join(' ')}`);
    console.log();

    // Example 2: Perfect binary tree of height 3
    const perfectTree = [-1, 0, 0, 1, 1, 2, 2];
    const [height2, leafCount2] = calculateTreeProperties(perfectTree);
    console.log('Example 2 (Perfect Binary Tree):');
    console.log(`Height: ${height2}`);
    console.log(`Leaf count: ${leafCount2}`);
    console.log(`Parents array: ${perfectTree.join(' ')}`);
    console.log();

    // Example 3: Star-shaped tree
    const starTree = [-1, 0, 0, 0, 0, 0];
    const [height3, leafCount3] = calculateTreeProperties(starTree);
    console.log('Example 3 (Star-shaped Tree):');
    console.log(`Height: ${height3}`);
    console.log(`Leaf count: ${leafCount3}`);
    console.log(`Parents array: ${starTree.join(' ')}`);
} 
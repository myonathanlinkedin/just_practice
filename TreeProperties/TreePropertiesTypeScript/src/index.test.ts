import { calculateTreeProperties } from './index';

describe('Tree Properties Tests', () => {
    test('Example Test', () => {
        const parents = [5, 2, 5, 2, 1, -1, 5, 0];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(3);
        expect(leafCount).toBe(4);
    });

    test('Single Node Tree', () => {
        const parents = [-1];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(0);
        expect(leafCount).toBe(1);
    });

    test('Empty Tree', () => {
        const parents: number[] = [];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(0);
        expect(leafCount).toBe(0);
    });

    test('Linear Tree', () => {
        const parents = [1, 2, 3, 4, -1];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(4);
        expect(leafCount).toBe(1);
    });

    test('Perfect Binary Tree Height 2', () => {
        const parents = [-1, 0, 0];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(1);
        expect(leafCount).toBe(2);
    });

    test('Perfect Binary Tree Height 3', () => {
        const parents = [-1, 0, 0, 1, 1, 2, 2];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(2);
        expect(leafCount).toBe(4);
    });

    test.each([
        [[-1, 0, 0, 1, 1], 2, 3],
        [[-1, 0, 1, 1, 2, 2], 3, 3],
        [[1, -1, 1, 2, 2], 2, 3],
        [[1, 2, -1, 2, 3, 3], 2, 3],
    ])('Various Tree Shapes %p', (parents, expectedHeight, expectedLeaves) => {
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(expectedHeight);
        expect(leafCount).toBe(expectedLeaves);
    });

    test.each([10, 20, 50])('Star Shaped Trees size %i', (size) => {
        const parents = new Array(size).fill(0);
        parents[0] = -1;  // Root is first node
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(1);
        expect(leafCount).toBe(size - 1);
    });

    test.each([
        [[1, -1, 1, 2, 4, 4, 4], 2, 2],
        [[1, 2, -1, 2, 3, 5, 5], 2, 2],
        [[-1, 0, 1, 0, 3, 4, 5], 4, 2],
        [[1, 2, 3, 4, 5, -1], 5, 1],
        [[-1, 0, 1, 2, 3, 4], 5, 1],
    ])('Special Tree Structures %p', (parents, expectedHeight, expectedLeaves) => {
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(expectedHeight);
        expect(leafCount).toBe(expectedLeaves);
    });
}); 
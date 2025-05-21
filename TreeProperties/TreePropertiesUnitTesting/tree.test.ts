import { calculateTreeProperties, createPerfectBinaryTreeParents } from '../TreePropertiesTypeScript/src/index';

describe('Tree Properties Tests', () => {
    test('Example test case', () => {
        const parents = [5, 2, 5, 2, 1, -1, 5, 0];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(3);
        expect(leafCount).toBe(4);
    });

    test('Single node tree', () => {
        const parents = [-1];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(0);
        expect(leafCount).toBe(1);
    });

    test('Linear tree', () => {
        const parents = [-1, 0, 1];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(2);
        expect(leafCount).toBe(1);
    });

    test('Perfect binary tree', () => {
        const parents = [3, 3, 4, 4, 5, 5, 6, 6, -1];
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(3);
        expect(leafCount).toBe(4);
    });

    test('Maximum size tree (1500 nodes)', () => {
        const parents = Array(1500).fill(0);
        parents[0] = -1;
        const [height, leafCount] = calculateTreeProperties(parents);
        expect(height).toBe(1);
        expect(leafCount).toBe(1499);
    });

    describe('Various tree shapes', () => {
        test.each([
            [[5, 2, 5, 2, 1, -1, 5, 0], 3, 4],
            [[-1, 0, 0], 1, 2],
            [[-1, 0, 0, 1, 1], 2, 4],
            [[-1, 0, 1, 1, 2, 2], 3, 4],
            [[1, -1, 1, 2, 2], 2, 3],
            [[1, 2, -1, 2, 3, 3], 3, 3]
        ])('Tree with parents %p should have height %i and %i leaves', 
            (parents, expectedHeight, expectedLeaves) => {
                const [height, leafCount] = calculateTreeProperties(parents);
                expect(height).toBe(expectedHeight);
                expect(leafCount).toBe(expectedLeaves);
            }
        );
    });

    describe('Large linear trees', () => {
        test.each([10, 20, 50, 100])('Linear tree of size %i', (size) => {
            const parents = Array(size).fill(0);
            for (let i = 1; i < size; i++) {
                parents[i] = i - 1;
            }
            parents[0] = -1;
            const [height, leafCount] = calculateTreeProperties(parents);
            expect(height).toBe(size - 1);
            expect(leafCount).toBe(1);
        });
    });

    describe('Perfect binary trees', () => {
        test.each([8, 16, 32])('Perfect binary tree of size %i', (size) => {
            const parents = createPerfectBinaryTreeParents(size);
            const [height, leafCount] = calculateTreeProperties(parents);
            expect(height).toBe(Math.floor(Math.log2(size)));
            expect(leafCount).toBe(Math.floor(size / 2));
        });
    });

    describe('Star-shaped trees', () => {
        test.each([10, 20, 50])('Star-shaped tree of size %i', (size) => {
            const parents = Array(size).fill(0);
            parents[0] = -1;
            const [height, leafCount] = calculateTreeProperties(parents);
            expect(height).toBe(1);
            expect(leafCount).toBe(size - 1);
        });
    });

    describe('Special tree structures', () => {
        test.each([
            [[1, -1, 1, 2, 4, 4, 4], 3, 4],
            [[1, 2, -1, 2, 3, 5, 5], 4, 3],
            [[-1, 0, 1, 0, 3, 4, 5], 5, 1],
            [[1, 2, 3, 4, 5, -1], 5, 1],
            [[-1, 0, 1, 2, 3, 4], 5, 1]
        ])('Special structure %p should have height %i and %i leaves', 
            (parents, expectedHeight, expectedLeaves) => {
                const [height, leafCount] = calculateTreeProperties(parents);
                expect(height).toBe(expectedHeight);
                expect(leafCount).toBe(expectedLeaves);
            }
        );
    });
});
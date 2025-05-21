using Xunit;
using System;
using System.Collections.Generic;

public class TreePropertiesTests
{
    private (int height, int leafCount) CalculateTreeProperties(int[] parents)
    {
        int n = parents.Length;
        if (n == 0) return (0, 0);
        if (n == 1) return (0, 1);  // Special case for single node
        List<List<int>> children = new(n);
        for (int i = 0; i < n; i++)
            children.Add(new List<int>());
        int root = -1;
        for (int i = 0; i < n; i++)
        {
            if (parents[i] == -1) root = i;
            else children[parents[i]].Add(i);
        }
        int leafCount = 0;
        int maxHeight = 0;
        void DFS(int node, int height)
        {
            if (children[node].Count == 0)
            {
                leafCount++;
                maxHeight = Math.Max(maxHeight, height);
                return;
            }
            foreach (int child in children[node])
                DFS(child, height + 1);
        }
        DFS(root, 0);
        return (maxHeight, leafCount);
    }

    [Fact]
    public void Example_Test()
    {
        int[] parents = { 5, 2, 5, 2, 1, -1, 5, 0 };
        var result = CalculateTreeProperties(parents);
        Assert.Equal(3, result.height);
        Assert.Equal(4, result.leafCount);
    }

    [Fact]
    public void Single_Node_Tree()
    {
        int[] parents = { -1 };
        var result = CalculateTreeProperties(parents);
        Assert.Equal(0, result.height);
        Assert.Equal(1, result.leafCount);
    }

    [Fact]
    public void Empty_Tree()
    {
        int[] parents = Array.Empty<int>();
        var result = CalculateTreeProperties(parents);
        Assert.Equal(0, result.height);
        Assert.Equal(0, result.leafCount);
    }

    [Fact]
    public void Linear_Tree()
    {
        int[] parents = { 1, 2, 3, 4, -1 };
        var result = CalculateTreeProperties(parents);
        Assert.Equal(4, result.height);
        Assert.Equal(1, result.leafCount);
    }

    [Fact]
    public void Perfect_Binary_Tree_Height_2()
    {
        int[] parents = { -1, 0, 0 };
        var result = CalculateTreeProperties(parents);
        Assert.Equal(1, result.height); // 2 nodes, 1 edge from root to leaf
        Assert.Equal(2, result.leafCount);
    }

    [Fact]
    public void Perfect_Binary_Tree_Height_3()
    {
        int[] parents = { -1, 0, 0, 1, 1, 2, 2 };
        var result = CalculateTreeProperties(parents);
        Assert.Equal(2, result.height); // 3 nodes, 2 edges from root to leaf
        Assert.Equal(4, result.leafCount);
    }

    [Theory]
    [InlineData(new int[] { -1, 0, 0, 1, 1 }, 2, 3)]  // Two levels of branching (height=2 edges, 3 leaves)
    [InlineData(new int[] { -1, 0, 1, 1, 2, 2 }, 3, 3)]  // Asymmetric tree (height=3 edges, 3 leaves)
    [InlineData(new int[] { 1, -1, 1, 2, 2 }, 2, 3)]  // Root in middle (height=2 edges, 3 leaves)
    [InlineData(new int[] { 1, 2, -1, 2, 3, 3 }, 2, 3)]  // Complex branching (height=2 edges, 3 leaves)
    public void Various_Tree_Shapes(int[] parents, int expectedHeight, int expectedLeaves)
    {
        var result = CalculateTreeProperties(parents);
        Assert.Equal(expectedHeight, result.height);
        Assert.Equal(expectedLeaves, result.leafCount);
    }

    [Theory]
    [InlineData(10)]
    [InlineData(20)]
    [InlineData(50)]
    public void Star_Shaped_Trees(int size)
    {
        int[] parents = new int[size];
        parents[0] = -1;  // Root is first node
        for (int i = 1; i < size; i++)
            parents[i] = 0;
        var result = CalculateTreeProperties(parents);
        Assert.Equal(1, result.height);
        Assert.Equal(size - 1, result.leafCount);
    }

    [Theory]
    [InlineData(new int[] { 1, -1, 1, 2, 4, 4, 4 }, 2, 2)]  // Multiple branches at same level (height=2 edges, 2 leaves)
    [InlineData(new int[] { 1, 2, -1, 2, 3, 5, 5 }, 2, 2)]  // Zigzag pattern (height=2 edges, 2 leaves)
    [InlineData(new int[] { -1, 0, 1, 0, 3, 4, 5 }, 4, 2)]  // Mixed branching (height=4 edges, 2 leaves)
    [InlineData(new int[] { 1, 2, 3, 4, 5, -1 }, 5, 1)]     // Right-leaning linear (height=5 edges, 1 leaf)
    [InlineData(new int[] { -1, 0, 1, 2, 3, 4 }, 5, 1)]     // Left-leaning linear (height=5 edges, 1 leaf)
    public void Special_Tree_Structures(int[] parents, int expectedHeight, int expectedLeaves)
    {
        var result = CalculateTreeProperties(parents);
        Assert.Equal(expectedHeight, result.height);
        Assert.Equal(expectedLeaves, result.leafCount);
    }
} 
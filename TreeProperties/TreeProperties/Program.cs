using System;
using System.Collections.Generic;
using System.Linq;

namespace TreeProperties;

class Program
{
    static (int height, int leafCount) CalculateTreeProperties(int[] parents)
    {
        int n = parents.Length;
        if (n == 0) return (0, 0);
        if (n == 1) return (0, 1);  // Special case for single node
        
        List<List<int>> children = new(n);
        
        // Initialize the adjacency lists
        for (int i = 0; i < n; i++)
        {
            children.Add(new List<int>());
        }
        
        // Build the tree structure
        int root = -1;
        for (int i = 0; i < n; i++)
        {
            if (parents[i] == -1)
            {
                root = i;
            }
            else
            {
                children[parents[i]].Add(i);
            }
        }
        
        // Calculate height and leaf count using DFS
        int maxHeight = 0;
        int leafCount = 0;
        bool[] visited = new bool[n];
        
        void DFS(int node, int height)
        {
            visited[node] = true;
            bool isLeaf = true;
            
            foreach (int child in children[node])
            {
                if (!visited[child])
                {
                    isLeaf = false;
                    DFS(child, height + 1);
                }
            }
            
            if (isLeaf || children[node].Count == 0)
            {
                leafCount++;
                maxHeight = Math.Max(maxHeight, height);
            }
        }
        
        DFS(root, 0);
        return (maxHeight, leafCount);
    }
    
    static void Main(string[] args)
    {
        try
        {
            Console.WriteLine("Enter the parent array (space-separated numbers):");
            string? input = Console.ReadLine();
            
            if (string.IsNullOrEmpty(input))
            {
                Console.WriteLine("Invalid input: Empty string");
                return;
            }
            
            int[] parents = input.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                               .Select(int.Parse)
                               .ToArray();
                               
            var (height, leafCount) = CalculateTreeProperties(parents);
            
            Console.WriteLine($"Tree Height: {height}");
            Console.WriteLine($"Number of Leaf Nodes: {leafCount}");
        }
        catch (FormatException)
        {
            Console.WriteLine("Invalid input: Please enter space-separated numbers only");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}

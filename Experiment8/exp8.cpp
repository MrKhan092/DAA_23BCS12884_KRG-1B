// User Function Template
class Solution {
  public:
    vector<int> dijkstra(int V, vector<vector<int>> &edges, int src) {
        // Code here
        vector<vector<pair<int,int>>>adj(V);
        for(int i=0;i<edges.size();i++){
            int u=edges[i][0];
            int v=edges[i][1];
            int w=edges[i][2];
            adj[u].push_back({w,v});
            adj[v].push_back({w,u});
        }
        
        vector<int>dis(V,1e9);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
        q.push({0,src});
        dis[src]=0;
        while(!q.empty()){
            auto i=q.top();
            int w=i.first;
            int node=i.second;
            q.pop();
            for(auto it:adj[node]){
                int adjnode=it.second;
                int adjw=it.first;
                if(w+adjw<dis[adjnode]){
                    dis[adjnode]=w+adjw;
                    q.push({dis[adjnode],adjnode});
                }
            }
        }
        return dis;
        
    }
};
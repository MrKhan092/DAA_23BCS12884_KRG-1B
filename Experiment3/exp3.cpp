#include<iostream>
#include<map>
#include<vector>
using namespace std;

class Solution {
  public:
    vector<vector<int>> countFreq(vector<int>& arr) {
        map<int,int> mp;  // keeps keys sorted
        for (int num : arr) {
            mp[num]++;
        }
        
        vector<vector<int>> result;
        for (auto &p : mp) {
            result.push_back({p.first, p.second});
        }
        
        return result;
    }
};

int main() {
    Solution obj;
    vector<int> arr = {3, 1, 2, 2, 1, 4};  // sample input
    
    vector<vector<int>> ans = obj.countFreq(arr);
    
    cout << "Element  Frequency" << endl;
    for (auto &p : ans) {
        cout << p[0] << " -> " << p[1] << endl;
    }
    
    return 0;
}

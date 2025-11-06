class Solution {
  public:
    bool solve(vector<int>& arr, int sum,vector<vector<int>>&dp,int i){
        if(sum==0) return true;
        if(i==0){
            return arr[i]==sum;
        }
        if(dp[i][sum]!=-1) return dp[i][sum];
        bool notpick=solve(arr,sum,dp,i-1);
        bool pick=false;
        if(arr[i]<=sum){
             pick=solve(arr , sum-arr[i],dp,i-1);
        }
        return dp[i][sum]=pick||notpick;
    }
    bool isSubsetSum(vector<int>& arr, int sum) {
        // code here
        int n=arr.size();
        vector<vector<int>>dp(n,vector<int>(sum+1,-1));
        return solve(arr,sum,dp,n-1);
    }
};
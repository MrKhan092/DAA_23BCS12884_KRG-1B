class Solution {
  public:
    vector<int> search(string &pat, string &txt) {
        vector<int> res;
        int n = txt.size(), m = pat.size();
        for (int i = 0; i <= n - m; i++) {
            if (txt.substr(i, m) == pat)
                res.push_back(i);
        }
        return res;
    }
};
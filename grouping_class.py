class Grouping():
    def __init__(self, n, g, INPUT):
        self.n = n
        self.g = g
        self.INPUT = INPUT
        self.groups = []
        self.persons_compatibility = [[-1 for j in range(n)]for i in range(n)]
        
    def grouping(self, n, g):
        used = [0] * self.n
        self.groups = []
        m = self.n//self.g # 1グループの最低人数
        
        def dfs2(B,A,m):
            if(len(B)==m):
                dfs1(A + [B])
                return
        
            for i in range(B[-1]+1,n):
                if(used[i]==0):
                    used[i] = 1
                    dfs2(B + [i],A,m)
                    used[i] = 0
            
        def dfs1(A):
            if(used.count(1) == n):
                self.groups.append(A[:])
                return
            
            for i in range(n):
                if(used[i]==0):
                    s = i
                    break
            used[s] = 1
            if(len(A)<n%g):
                dfs2([s],A,m+1)
            else:
                dfs2([s],A,m)
            used[s] = 0
        
        dfs1([])
        return self.groups

    def calculate_persons_compatibility(self, INPUT):
        n = len(self.INPUT)
        # support : MBTI番号の対応
        support = {
            "ENTP" : 0,
            "ENTJ" : 1,
            "ENFP" : 2,
            "ENFJ" : 3,
            "ESTP" : 4,
            "ESTJ" : 5,
            "ESFP" : 6,
            "ESFJ" : 7,
            "INTP" : 8,
            "INTJ" : 9,
            "INFP" : 10,
            "INFJ" : 11,
            "ISTP" : 12,
            "ISTJ" : 13,
            "ISFP" : 14,
            "ISFJ" : 15,
        }

        # mbti_compatibility : 互いのMBTI同士の相性 | mbti_compatibility_{i,j} : 性格iと性格jの相性(0≤i,j≤15)
        mbti_compatibility = [
            [0.8,0.6,0.6,0.4,0.8,0.4,0.6,0.8,0.4,0.8,0.6,0.4,0.8,0.8,1.0,0.2],
            [0.6,0.8,0.4,0.8,0.2,0.6,0.8,0.6,0.8,0.4,0.4,0.8,0.4,0.6,0.2,1.0],
            [0.6,0.4,0.8,0.6,0.6,0.8,0.8,0.2,0.6,0.4,0.4,0.8,1.0,0.2,0.8,0.4],
            [0.4,0.8,0.6,0.8,0.8,0.6,0.4,0.6,0.4,0.8,0.8,0.4,0.2,1.0,0.4,0.6],
            [0.8,0.4,0.6,0.8,0.8,0.6,0.6,0.4,0.8,0.4,1.0,0.2,0.4,0.8,0.6,0.4],
            [0.4,0.6,0.4,0.6,0.6,0.8,0.4,0.8,0.4,0.6,0.2,1.0,0.8,0.4,0.4,0.8],
            [0.6,0.8,0.8,0.4,0.6,0.4,0.8,0.6,1.0,0.2,0.8,0.4,0.6,0.4,0.4,0.8],
            [0.8,0.6,0.4,0.6,0.4,0.8,0.6,0.8,0.2,1.0,0.4,0.6,0.4,0.8,0.8,0.4],
            [0.4,1.0,0.6,0.4,0.8,0.4,1.0,0.2,0.8,0.6,0.6,0.4,0.8,0.4,0.6,0.8],
            [0.8,0.4,0.4,0.8,0.4,0.6,0.2,1.0,0.6,0.8,0.4,0.8,0.4,0.6,0.8,0.6],
            [0.6,0.4,0.4,0.8,1.0,0.2,0.8,0.4,0.6,0.4,0.8,0.6,0.6,0.8,0.8,0.4],
            [0.4,0.8,0.8,0.4,0.2,1.0,0.4,0.6,0.4,0.8,0.6,0.8,0.8,0.6,0.4,0.6],
            [0.8,0.4,1.0,0.2,0.4,0.8,0.6,0.4,0.8,0.4,0.6,0.8,0.8,0.6,0.6,0.4],
            [0.4,0.6,0.2,1.0,0.8,0.4,0.4,0.8,0.4,0.6,0.8,0.6,0.6,0.8,0.4,0.8],
            [1.0,0.2,0.8,0.4,0.6,0.4,0.4,0.8,0.6,0.8,0.8,0.4,0.6,0.4,0.8,0.6],
            [0.2,1.0,0.4,0.6,0.4,0.8,0.8,0.4,0.8,0.6,0.4,0.6,0.4,0.8,0.6,0.8]
        ]

        # name, mbti : 入力
        name = []
        mbti = []
        for IN in self.INPUT:
            name.append(IN[0])
            mbti.append(support[IN[1]])
        # persons_compatibility : 互いの人同士の相性 | mbti_compatibility_{i,j} : 人iと人jの相性(0≤i,j≤n-1)
        for i in range(n):
            for j in range(n):
                self.persons_compatibility[i][j] = mbti_compatibility[mbti[i]][mbti[j]]
        return self.persons_compatibility
    
    def good_grouping(self, persons_compatibility, groups):
        # calculate_groupScore(group) : 各グループのスコアを計算する。
        def calculate_groupScore(group):
            groupScores = []
            for person in group:
                # persons_count : グループの人数
                persons_count = len(person)
                # edges_count : 辺の本数
                edges_count = persons_count*(persons_count-1)//2
                # sum_weights : 辺の重みの合計
                sum_weights = 0
                for i in range(persons_count):
                    for j in range(i+1, persons_count):
                        sum_weights += self.persons_compatibility[person[i]][person[j]]
                if(edges_count == 0):
                    groupScore = 0.8
                else:
                    groupScore = sum_weights / edges_count
                groupScores.append(groupScore)
            return groupScores
        
        # calculate_totalScore(G) : 総スコアを計算する。
        def calculate_totalScore(groupScores):
            # totalScore : グループスコアの合計
            totalScore = 0
            for i in range(len(groupScores)):
                totalScore += groupScores[i]
            return totalScore / len(groupScores)
        
        # calculate_decentralization(groupScores) : groupScoresの分散を計算する
        def calculate_decentralization(groupScores):
            mean_groupScores = sum(groupScores) / len(groupScores)
            decentralization = 0
            for groupScore in groupScores:
                decentralization += (groupScore - mean_groupScores)**2
            return decentralization
    
        def output(groups):
            # groupScores | グルーピングの各グループスコア | groupScores = [[g(G_1), g(G_2), ...], ... ]
            groupScores = []
            # totalScore_groups : 総スコアとそのグループ番号 | totalScore_groups = [[totalScore_0, -decentralizatio_0, 0], [totalScore_1, -decentralizatio_1, 1], ...]
            totalScore_groups = []
            # decentralization_groups : 分散とそのグループ番号 | decentralization_groups  = [[decentralizatio_0, -totalScore_0, 0], [decentralizatio_1, -totalScore_1, 1], ...]
            decentralization_groups = []
            # group_scores : グループ番号とそれぞれのスコア | group_scores = [[totalScore_0, decentralizatio_0], [totalScore_1, decentralizatio_1], ...]
            group_scores = []
            for i in range(len(groups)):
                group = groups[i]
                groupScore = calculate_groupScore(group)
                totalScore = calculate_totalScore(groupScore)
                decentralization = calculate_decentralization(groupScore)
                groupScores.append(groupScore)
                totalScore_groups.append([totalScore, -decentralization, i])
                decentralization_groups.append([decentralization, -totalScore, i])
                group_scores.append([totalScore, decentralization])
        
            totalScore_groups.sort(reverse = True)
            decentralization_groups.sort()
        
            return groupScores, totalScore_groups, decentralization_groups, group_scores
        
        return output(self.groups)

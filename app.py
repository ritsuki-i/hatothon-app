from flask import Flask
from flask import render_template , request
import copy
from grouping_class import Grouping


app = Flask(__name__)

mbti_list = ["ENTP(討論者)",
            "ENTJ(指揮官)",
            "ENFP(広報運動家)",
            "ENFJ(主人公)",
            "ESTP(起業家)",
            "ESTJ(幹部)",
            "ESFP(エンターテイナー)",
            "ESFJ(領事官)",
            "INTP(論理学者)",
            "INTJ(建築家)",
            "INFP(仲介者)",
            "INFJ(提唱者)",
            "ISTP(巨匠)",
            "ISTJ(管理者)",
            "ISFP(冒険家)",
            "ISFJ(擁護者)"]

@app.route('/')
def route():
    return render_template(
        'index.html',mbti_list = mbti_list
    )

@app.route('/index',methods=['GET','POST'])
def index():
    return render_template(
        'index.html', mbti_list = mbti_list
    )


    

@app.route('/result',methods=['GET','POST'])
def result():
    if request.method == 'POST':
        """
        INPUT = [ # 入力
        ["くしら","ISFP"],
        ["せいや","INTP"],
        ["そらち","INTP"],
        ["かいちょう","ESTP"],
        ["ゆきの","INTJ"],
        ["りつき","ISTJ"],
        ["とわ","ISFJ"],
        ["A","ENTJ"],
        ["B","ISTP"],
        ["C","ENTP"],
        ["D","INTP"],
        ["E","ISTJ"],
        ]
        """
        
        input = request.form.getlist('get_input')
        count = 0
        input_list = []
        INPUT=[]
        for i in range(len(input)):
            if (count%2==0):
                input_list.append(input[i])
            count += 1
            if (count%2==0):
                input_list.append(input[i][0:4])
                INPUT.append(input_list)
                input_list = []
        print(INPUT)
        
        n = len(INPUT) # 人数
        g = int(request.form.get('group_num')) #グループ数
        
        group_class = Grouping(n,g,INPUT)
        groups = group_class.grouping(n, g)
        persons_compatibility = group_class.calculate_persons_compatibility(INPUT)
        groupScores, totalScore_groups, decentralization_groups, group_scores = group_class.good_grouping(persons_compatibility, groups)

        groups_name = copy.deepcopy(groups)
        for i in range(len(groups)):
            for j in range(len(groups[i])):
                for k in range(len(groups[i][j])):
                    groups_name[i][j][k] = f"{INPUT[groups[i][j][k]][0]}({INPUT[groups[i][j][k]][1]})"
                    
        group_idx = totalScore_groups[0][2]
        
        return render_template('result.html', groups_name=groups_name[group_idx])
    else:
        return render_template('index.html', mbti_list = mbti_list)
    
    
    


    

if __name__ == "__main__":
    app.run(debug=True)


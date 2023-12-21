from flask import Flask
from flask import render_template , request
import copy
from grouping_class import Grouping


app = Flask(__name__)

mbti_dic = {"ENTP":"./static/images/debater.jpeg",
            "ENTJ":"./static/images/commander.jpeg",
            "ENFP":"./static/images/activist.jpeg",
            "ENFJ":"./static/images/protagonist.jpeg",
            "ESTP":"./static/images/entrepreneur.jpeg",
            "ESTJ":"./static/images/executives.jpeg",
            "ESFP":"./static/images/entertainer.jpeg",
            "ESFJ":"./static/images/consul.jpeg",
            "INTP":"./static/images/logist.jpeg",
            "INTJ":"./static/images/architect.jpeg",
            "INFP":"./static/images/intermediary.jpeg",
            "INFJ":"./static/images/advocater.jpeg",
            "ISTP":"./static/images/master.jpeg",
            "ISTJ":"./static/images/administrator.jpeg",
            "ISFP":"./static/images/adventurer.jpeg",
            "ISFJ":"./static/images/defender.jpeg"}

@app.route('/')
def route():
    return render_template(
        'index.html'
    )

@app.route('/index',methods=['GET','POST'])
def index():
    return render_template(
        'index.html'
    )
    
@app.route('/how_to_use',methods=['GET','POST'])
def how_to_use():
    return render_template(
        'how_to_use.html'
    )

@app.route('/member',methods=['GET','POST'])
def member():
    return render_template(
        'member.html'
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
                input_list.append(input[i][0:4])
            count += 1
            if (count%2==0):
                input_list.insert(0, input[i])
                INPUT.append(input_list)
                input_list = []
        
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
                    groups_name[i][j][k] = INPUT[groups[i][j][k]][0]
                    
        group_idx = totalScore_groups[0][2]
        group_score = int(groupScores[group_idx][1] * 100)
        groups_name[group_idx] = [[['a', 'as'],['ISFP', 'ISFP']], [['立騎', 'aa'],['ISFP', 'ISFP']]]
        groups_name[group_idx] = [[['a', 'ISFP'],['as', 'ISFP'],['as', 'ISFP'],['as', 'ISFP']], [['立騎', 'ISFP'],['sa', 'ISFP'],['as', 'ISFP'],['as', 'ISFP']]]
        return render_template('result.html', groups_name=groups_name[group_idx], group_score = group_score, grouping_num=g, numofpeople=n, mbti_dic=mbti_dic)
    else:
        return render_template('member.html')
    
    
    


    

if __name__ == "__main__":
    app.run(debug=True)


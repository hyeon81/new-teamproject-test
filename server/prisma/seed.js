import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.test.createMany({
      data: [
        {
          id: 1,
          title: "Test 1",
          mainColor: "#ffffff",
          backColor: "#000000",
          description: "Description for Test 1",
        },
      ],
    });

    await prisma.question.createMany({
      data: [
        {
          id: 1,
          testId: 1,
          option: "EI",
          question1:
            "새 학년 새 학기 수업 시간. 이 수업에 팀플이 있다는 걸 알게 되었다. 이 때 내가 든 생각은?",
          question2: "이 때 내가 든 생각은?",
          answers:
            '[{"type":"E","content1":"\'새로운 사람 만나는 건 좋지\'","content2":"괜찮다고 생각한다"},{"id":"","type":"I","content1":"\'팀플 너무 싫어 드랍할 걸...\'","content2":"벌써부터 힘들다고 생각한다"}]',
        },
        {
          id: 2,
          testId: 1,
          option: "JP",
          question1:
            "교수님이 짜신 팀플 조가 공지에 올라왔다. 그러나 아무도 단톡방을 만들지 않는데...",
          question2: "내가 나설까??",
          answers:
            '[{"type":"J","content1":"\'단톡방 만드는 게 뭐가 어렵다고\'","content2":"바로 만든다"},{"id":"","type":"P","content1":"\'다른 사람이 만들겠지\'","content2":"만들지 않고 기다린다"}]',
        },
        {
          id: 3,
          testId: 1,
          option: "EI",
          question1: "팀플 단톡방이 만들어졌지만, 아무도 인사하지 않는데...",
          question2: "내가 먼저 말을 꺼낼까?",
          answers:
            '[{"type":"E","content1":"\'팀플할려면 어차피 친해져야 하잖아\'","content2":"먼저 나서서 분위기를 푼다"},{"id":"","type":"I","content1":"\'아무도 인사 안 하는데 내가 굳이...?\'","content2":"인사 안하고 다른 사람이 인사하면 인사한다"}]',
        },
        {
          id: 4,
          testId: 1,
          option: "NS",
          question1: "발표 주제를 정하는 시간",
          question2: "이 때 나의 행동은?",
          answers:
            '[{"id":"","type":"N","content1":"\'이것도 괜찮고 이것도 괜찮지 않을까?\'","content2":"이것저것 아이디어를 낸다"},{"id":"","type":"S","content1":"\'음 저 주제는 이런 부분이 부족한데...\'","content2":"다른 사람이 낸 주제를 피드백 해준다"}]',
        },
        {
          id: 5,
          testId: 1,
          option: "TF",
          question1: "다른 팀원 낸 주제가 우리 발표랑 별로 안 맞는 것 같아",
          question2: "이 때 나의 행동은?",
          answers:
            '[{"type":"T","content1":"이런 주제는 이 부분에서 안 맞는 것 같아요! 다른 주제로 하죠","content2":"별로 안맞는다고 바로 말한다"},{"id":"","type":"F","content1":"좋은 주제인데... 이 부분에서 조금 안 맞을수도 있을 것 같아요","content2":"돌려서 말한다"}]',
        },
        {
          id: 6,
          testId: 1,
          option: "JP",
          question1:
            "주제가 정해진 뒤 역할을 분담하는 시간, 역할 분담이 제대로 안되는 것 같은데...",
          question2: "이 때 나의 행동은?",
          answers:
            '[{"type":"J","content1":"\'너무 답답해!\'","content2":"나서서 역할분담을 한다"},{"id":"","type":"P","content1":"\'이러다가 정해지겠지\'","content2":"굳이 나서지 않는다"}]',
        },
        {
          id: 7,
          testId: 1,
          option: "EI",
          question1: "발표자를 정하는 시간",
          question2: "이 때 나의 행동은?",
          answers:
            '[{"type":"E","content1":"\'발표가 뭐 어렵다고\'","content2":"내가 발표하겠다고 한다"},{"id":"","type":"I","content1":"\'발표 싫어. 다른 역할 할래\'","content2":"다른 사람이 발표한다고 하길 기다린다"}]',
        },
        {
          id: 8,
          testId: 1,
          option: "JP",
          question1:
            "우여곡절 끝에 역할이 모두 분담되었다. 난 발표와 자료조사를 분담하게 되었다.",
          question2: "나에게 주어진 파트는 언제까지 마칠까?",
          answers:
            '[{"type":"J","content1":"\'얼른 끝내야지\'","content2":"최대한 빨리 끝내려고 노력한다"},{"id":"","type":"P","content1":"\'좀 남았으니까...\'","content2":"나중으로 미룬다"}]',
        },
        {
          id: 9,
          testId: 1,
          option: "NS",
          question1:
            "팀플 과제 마감날, 어쩌다보니 나에게 분담된 과제를 제대로 하지 못했다!",
          question2: "이 때 내 생각은?",
          answers:
            '[{"type":"N","content1":"\'내가 이걸 못해서 팀플이 망하면 학점이 망하겠지... 어떡하냐?\'","content2":"미래에 대해 걱정한다"},{"id":"","type":"S","content1":"\'왜 과제를 제대로 못했지?\'","content2":"원인에 대해 생각한다"}]',
        },
        {
          id: 10,
          testId: 1,
          option: "TF",
          question1:
            "막판 스퍼트를 내 팀플 과제를 끝냈다. 근데... 팀원의 자료조사 부분이 부족한 것 같다.",
          question2: "이 때 나의 행동은?",
          answers:
            '[{"type":"T","content1":"너무 부족하게 해오신 것 같아요","content2":" 바로 다시 해오라 한다"},{"id":"","type":"F","content1":"이 부분만 조금 수정해주실 수 있나요?","content2":"최대한 돌려서 말한다."}]',
        },
        {
          id: 11,
          testId: 1,
          option: "NS",
          question1: "대망의 발표 전 날,",
          question2: "이 때 나의 모습은?",
          answers:
            '[{"type":"N","content1":"\'실수하면 어떡하지?\'","content2":"여러 걱정에 여러번 연습한다"},{"id":"","type":"S","content1":"\'이 정도면 괜찮을 것 같아\'","content2":"몇 번 연습하다 미련없이 잔다"}]',
        },
        {
          id: 12,
          testId: 1,
          option: "TF",
          question1:
            "대망의 발표 시간, 완벽하게 발표 후 질문 시간을 갖는데, 다소 공격적인 질문이 들어온다.",
          question2: "이 때 나는?",
          answers:
            '[{"type":"T","content1":"\'그 부분은 이렇게 대답할 수 있지\'","content2":"딱히 타격없이 대답한다"},{"id":"","type":"F","content1":"\'뭐지 저 사람 나 싫어하나\'","content2":"대답은 하지만 기분이 다운된다"}]',
        },
      ],
    });

    await prisma.result.createMany({
      data: [
        {
          id: 1,
          testId: 1,
          subhead: "#계획적 #합리적 #독고다이 #팀플캐리",
          nickname1: "혼자서 더 잘해요!",
          nickname2: "계획적 독고다이 팀원",
          img: "/img/INTJ.jpg",
          description:
            '"[   \\"계획적이고 대개 분석력이 높은 편이에요\\",   \\"하나부터 열까지 철저하게 계획하는 것을 좋아해요\\",   \\"개인주의적인 성향이라 타인에게 감정을 잘 드러내지 않고, 공감을 어려워 하는 편이에요\\",   \\"혼자서 하는 게 편하다보니 혼자서 조별 과제를 할 때가 있어요\\",   \\"타인에게 잘 보이고 싶은 생각이 별로 없어서 친해지기 어려울 수도 있어요\\",   \\"신속하고 계획적으로 과제를 하기 때문에 팀 내 브레인 역할이에요\\",   \\"고집이 세서 팀원과의 소통이 원활하게 이뤄지지 않을 수도 있어요\\" ]"',
          name: "INTJ",
        },
        {
          id: 2,
          testId: 1,
          subhead: "#논리적 #분석적 #호기심 #아이디어뱅크",
          nickname1: "아이디어는 내게 맡겨!",
          nickname2: "논리적 아이디어뱅크 팀원",
          img: "/img/INTP.jpg",
          description:
            '"[   \\"이해가 빠르고 높은 직관력으로 통찰력이 있어요\\",   \\"호기심이 많고 지적인 것에 관심이 많아요.\\",   \\"평소엔 조용하지만 관심 있는 분야에선 말이 많아져요\\",   \\"혼자서 조용하고 과묵하게 논리와 분석으로 과제를 해결해요\\",   \\"아이디어가 많은 편이에요. 하지만 고집이 있어서 자신의 아이디어만 고집할 수도 있어요\\",   \\"다소 충동적인 모습도 보이고, 현실감각이 둔할 때도 있어요\\",   \\"주로 자료조사 역할을 많이 맡아요\\" ]"',
          name: "INTP",
        },
        {
          id: 3,
          testId: 1,
          subhead: "#계획적 #창의적 #갈등조정 #평화주의자",
          nickname1: "평화롭게 갑시다!",
          nickname2: "계획적 서포팅형 팀원",
          img: "/img/INFJ.jpg",
          description:
            '"[   \\"인내심이 많고 통찰력과 직관이 뛰어나며 배려심이 많아요\\",   \\"팀플에서 다른 팀원들에게 잘 맞춰주고, 웬만해선 불만을 표시하지 않아요\\",   \\"대신 조심스럽게 의견을 제시하며 원하는 방향으로 이끈답니다\\",   \\"역할이 주어지면 그 때 그 때 바로바로, 아주 완벽하게 끝내놓아요. 완벽주의자 성향 때문에 자신이 맡은 역할이 아니더라도 해놨을 가능성이 높아요\\",   \\"사람은 좁고 깊게 사귀는 타입이에요\\",   \\"팀플에서 주로 서포팅을 해주고, PPT 제작을 맡는 경우가 많아요\\" ]"',
          name: "INFJ",
        },
        {
          id: 4,
          testId: 1,
          subhead: "#창의적 #수줍음 #낭만적 #평화주의자",
          nickname1: "완벽하지 않으면 시작 안 해!",
          nickname2: "게으름 창의력 맥스 팀원",
          img: "/img/INFP.jpg",
          description:
            '"[   \\"상상력과 창의력이 풍부한 편이에요\\",   \\"감수성이 풍부하고 이상주의 성향이 강해요\\",   \\"나의 꿈과 이상에 대해서 생각하는 것을 즐겨요\\",   \\"자기 성격에 대해 이해가 높아요.\\",   \\"혼자서 일할 때 집중력이 뛰어나요\\",   \\"사람들과의 만남을 좋아하지만, 수줍음이 많아 많은 사람들 앞에서는 말이 없어지기도 해요\\",   \\"대체로 타인에게 맞춰주는 성향이 강하며, 상대방의 생각과 의견을 존중해요\\" ]"',
          name: "INFP",
        },
        {
          id: 5,
          testId: 1,
          subhead: "#계획적 #원리원칙 #팀플캐리 #현실적",
          nickname1: "비효율은 참을 수 없어!",
          nickname2: "단호박 완벽주의 팀원",
          img: "/img/ISTJ.jpg",
          description:
            '[   "문제해결이 높은 이상적인 전략가예요. 원리원칙적이고 계획적이에요",   "주변을 객관적으로 분석하고 사실에 입각하여 현실적으로 실행가능한 계획을 세우는 것을 좋아해요. 계획이 틀어지는 걸 싫어해요",   "공과 사 확실하고 업무는 미리미리 해요",   "혼자 일할 수 있는 것을 좋아해요. 팀플은 스트레스로 느껴져요",   "게으른 사람, 무임승차자 싫어해요. 일을 못하는 사람을 매우 답답해 해요",   "답답해서 주로 조장을 맡아요. 차라리 본인이 다 하는 게 낫다고 생각해요" ]',
          name: "ISTJ",
        },
        {
          id: 6,
          testId: 1,
          subhead: "#책임감 #헌신적 #서포팅 #협조적",
          nickname1: "서포트는 나에게 맡겨!",
          nickname2: "온화한 서포팅형 팀원",
          img: "/img/ISFJ.jpg",
          description:
            '[   "책임감과 인내력이 강하고 헌신적이며 온화한 성격의 소유자예요.",   "눈치가 빨라 상대방의 성향과 분위기를 쉽게 파악하고, 공감능력이 뛰어나서 타인의 감정을 잘 읽어요",   "나서서 이끄는 것보단 팀원들을 도와주는 것을 좋아해요",   "협조적인 성격이라 프로젝트 중에 큰 트러블이 생길 일이 없어요. 다수의 의견을 잘 따라줘요",   "그러면서도 자신의 일을 계획적으로 꼼꼼하게 수행해요. 또한 다른 사람이 해놓은 것에 도움을 주거나, 꼼꼼히 피드백해주는 편이에요",   "혼자 있는 것을 좋아하고, 개인 시간을 방해받는 것을 싫어해요" ]',
          name: "ISFJ",
        },
        {
          id: 7,
          testId: 1,
          subhead: "#객관적 #합리적 #과묵함 #관심분야 한정 불도저",
          nickname1: "꽂히면 끝까지 간다!",
          nickname2: "(관심분야 한정) 하드캐리 팀원",
          img: "/img/ISTP.jpg",
          description:
            '[   "이성적이고 과묵하며 호기심이 많은 성향이에요",   "객관적이고 합리적이에요. 사실적 자료를 정리, 조직하기를 좋아해요",   "눈치가 빠르지만 피곤해질 것 같아서 나서지 않아요. 타인의 일에 무관심한 편이에요",   "관심분야의 경우 매우 열정적으로 몰두하고 적극적인 태도를 보여요. 반대로 관심 분야가 아닐 경우 소극적인 태도를 보여요",   "귀찮음이 심해 노력을 줄이면서 일의 능률을 높이는 걸 좋아해요",   "보통은 PPT를 잘 만들어서 PPT 제작 역할을 맡아요" ]',
          name: "ISTP",
        },
        {
          id: 8,
          testId: 1,
          subhead: "#화합중시 #자유로운 영혼 #남들에게 맞춰줌 #귀차니즘",
          nickname1: "남는 거 할게요...!",
          nickname2: "맞춤형 액체형 팀원",
          img: "/img/ISFP.jpg",
          description:
            '[   "자유로움을 중요시 하고 여유를 추구해요.",   "화합을 중시하며 충돌을 회피하는 성향이에요. 경쟁하는 분위기보다는 편안한 분위에서 능력을 발휘해요",   "남에게 싫은 소리 못하고 속으로 삭이는 경우가 많아요",   "적극적이지는 않지만 남들에게 다 맞춰주는 타입이에요. 그래도 자신이 좋아하는 분야에선 가끔 열정이 넘쳐요",   "결정을 내리는 걸 힘들어 해요. 귀찮아서 일을 미룰 때가 많아요",   "보통 조별과제에서 남는 거 해요" ]',
          name: "ISFP",
        },
        {
          id: 9,
          testId: 1,
          subhead: "#즉흥적 #도전정신 #인싸 #마이웨이",
          nickname1: "난 내 갈 길을 간다!",
          nickname2: "순발력갑 마이웨이 팀원",
          img: "/img/ESTP.jpg",
          description:
            '[   "현실 감각으로 타협책을 모색하고 문제 해결 능력이 뛰어나요. 순발력도 뛰어나요",   "사실적이고 관대하며 개방적이에요. 어디서든 잘 적응하기 때문에 팀원들과도 빨리 친해져요.",   "눈치는 빠르지만 남 눈치는 안 봐요. 완전 마이웨이예요",   "이것저것 도전하는 걸 좋아해요. 다소 즉흥적이에요. 하지만 뒷심은 약해요",   "갈등을 중재하는 편이에요. 그렇지만 필터링 없이 표현해서 다른 사람들이 상처받을 수도 있어요. 우유부단한 사람을 싫어해요",   "얽메이는 걸 싫어해요. 자유로운 상태일 때 능률이 올라요. 그렇지만 성취욕은 강해요",   "리더쉽이 있기 때문에 보통 조별과제 팀장을 할 때가 많아요. 어느새 팀 분위기를 주도하고 있을 거예요" ]',
          name: "ESTP",
        },
        {
          id: 10,
          testId: 1,
          subhead: "#관종 #우주최강친화력 #사실적 #귀차니즘",
          nickname1: "사람이 좋아!",
          nickname2: "친화력 끝판왕 귀차니즘 팀원",
          img: "/img/ESFP.jpg",
          description:
            '[   "활발하고 활동적이며 현실적이고 실제적이에요. 어떤 상황이든 잘 적응해요",   "주위 사람, 일에 대해 관심이 많고 사람이나 사물을 다루는 사실적인 상식이 풍부해요",   "사교성이 뛰어나고 센스와 유머를 겸비하고 있어요. 덕분에 모두들 허물없이 지내요",   "관심받는 걸 정말 좋아해요. 혼자 있는 걸 견디지 못해요",   "현재를 즐기며 삶을 사랑하는 사람들이에요",   "성격은 급하지만 귀차니즘도 심해요. 과제를 자주 미루고, 책임감이 막중한 일은 잘 안 맡으려고 해요. 허당끼도 심해요",   "틀에 박힌 것을 싫어하고, 계획에 따라 행동하는 것도 힘들어해요. 자유로울 때 능률이 올라가요",   "팀 내의 분위기 메이커예요. 팀플 뒷풀이를 주도할 가능성이 높아요" ]',
          name: "ESFP",
        },
        {
          id: 11,
          testId: 1,
          subhead: "#계획적 #완벽주의 #논리적 #미래지향적",
          nickname1: "내가 있는 한 이 팀플은 완벽해야 해!",
          nickname2: "열정 가득 불도저 리더형 팀원",
          img: "/img/ENTJ.jpg",
          description:
            '[   "계획적이고 분석력이 높은 편이에요. 자기주장이 강해 지도력과 통솔력이 있어요",   "논리를 사랑하고 비효율적인 것을 싫어해요. 불도저 같은 성향이에요",   "자존감이 높고 자기애가 강해요. 열등감을 잘 느끼지 않아요",   "지적 욕구가 강해요. 항상 지적 능력 향상에 노력하고자 해요",   "도전적이고 미래 지향적이에요. 미래에 대한 상상도 많이 하고 꿈도 커요",   "해결책을 찾을 때 여러가지 루트를 머릿속에서 시뮬레이션 해보고 찾아가는 편이에요",   "대부분 팀플의 팀장을 맡으려 해요. 맡는 이유는 하고 싶어서라기 보다는 다른 사람이 하는 걸 답답해하기 때문이에요" ]',
          name: "ENTJ",
        },
        {
          id: 12,
          testId: 1,
          subhead: "#자유로움 #여유로움 #도전정신 #임기응변",
          nickname1: "논쟁과 의견, 자유는 환영!",
          nickname2: "자유로운 영혼의 입털기 맥스 팀원",
          img: "/img/ENTP.jpg",
          description:
            '[   "개방적이고 자유를 추구해요. 변화를 좋아하고 느긋한 삶을 좋아해요. 완벽주의와는 거리가 멀어요",   "하나에 꽂히면 꾸준하게 파고들어요. 다방면에서 재능은 있으나 엄청 잘하는 편은 아니에요",   "도전을 좋아하고 자주 시도하지만 뒷심이 부족해요. 벼락치기를 선호해요",   "타고난 말빨의 소유자예요. 임기능변에 능하고 말보다는 행동이 앞서요",   "토론이나 논쟁을 좋아해요. 의견제시에도 적극적이에요. 내 의견으로 마무리가 나야 속이 시원해요",   "돌려 말하는 걸 못하기 때문에 팀원에게 상처를 줄 때도 있어요",   "팀장까지는 할 생각이 없었는데, 의견 제시와 논쟁을 하다보니 팀장을 맡게 되었을 경우가 높아요" ]',
          name: "ENTP",
        },
        {
          id: 13,
          testId: 1,
          subhead: "#다정다감 #책임감 #언변술사 #리더쉽",
          nickname1: "모두들 잘 따라오세요!",
          nickname2: "인류력 맥스, 다정다감 리더형 팀원",
          img: "/img/ENFJ.jpg",
          description:
            '[   "책임감이 강하고 이타적이며 동정심이 많아요",   "말로 사람의 마음을 움직이게 하는 능력이 탁월하며, 의사소통 능력이 뒤어나요",   "계획을 세우는 것을 좋아하고, 계획대로 사람들을 끌어가는 것을 잘해요",   "사람들을 좋아하고 인류애도 넘치지만, 혼자있는 것도 좋아하는 편이에요",   "다른 사람들의 눈치를 많이 보고, 사람들에게 잘 맞춰줘요. 상처도 잘 받아요",   "본인이 총대를 매고 팀장이 되는 경우가 많아요. 상대에게 싫은 소리를 못하면서도 일이 계획대로 되지 않으면 스트레스를 받아요. 그러다 결국 팀플을 혼자 다 할 때도 있어요" ]',
          name: "ENFJ",
        },
        {
          id: 14,
          testId: 1,
          subhead: "#아이디어뱅크 #친화력 #열정적 #용두사미",
          nickname1: "넘치는 아이디어! 일벌리는 게 좋아!",
          nickname2: "아이디어 담당 즉흥형 팀원",
          img: "/img/ENFP.jpg",
          description:
            '[   "정열적이고 긍정적이며 상상력이 풍부한 성향이에요",   "다른 사람들과 어울리는 것을 좋아해서 팀원들과도 빨리 친해져요. 의사소통 능력이 뛰어나요",   "그렇지만 은근히 내향적이고 독립적이에요. 다른 사람들과 노는 걸 좋아하지만 자기만의 시간도 필요해요",   "반복되는 것에 금방 싫증을 느껴요. 이것저것 하는 것을 좋아하기 때문에 일은 많이 벌리지만 뒷심은 약해요",   "아이디어 뱅크로 여러가지 의견을 제시해요. 다소 즉흥적으로 의견을 쏟아내는 경향이 있어요",   "좋아하는 것에는 미친 듯이 열정을 불태워요. 반면 하기 싫은 것에 대한 인내력은 부족해요",   "계획을 세우기 보다는 그때 그때 일을 처리하는 것을 좋아해요. 일머리가 있어서 결과는 좋은 편이에요" ]',
          name: "ENFP",
        },
        {
          id: 15,
          testId: 1,
          subhead: "#워커홀릭 #행동력 #계획적 #성취지향",
          nickname1: "계획대로 안되면 용납할 수 없어!",
          nickname2: "냉철한 완벽주의 리더형 팀원",
          img: "/img/ESTJ.jpg",
          description:
            '[   "현실적이고 실용주의적이며 효율을 추구하는 성향이에요",   "활동을 조직하고 주도해나가는 지도력이 있어요. 계획대로 프로젝트를 이끌어가는 것을 좋아하고 계획대로 되지 않는 걸 싫어해요",   "원하는 대로 프로젝트가 진행되지 않으면 답답해 해요. 일적으로 다른 사람에게 인정받는 걸 좋아해요",   "직설적으로 말을 하기 때문에 팀원에게 쉽게 상처를 줄 수도 있어요",   "상황을 객관적으로 분석하고 이해하는데 뛰어나요",   "자기애가 강하고 자존감이 높아요. 자기주장도 강하고 마이웨이도 강해요",   "다른 사람들이 일 못하는 걸 답답해 해서 본인이 다 하는 경우가 많아요. 보통 팀장을 맡아요" ]',
          name: "ESTJ",
        },
        {
          id: 16,
          testId: 1,
          subhead: "#사교적 #온화함 #분위기 메이커 #팀워크",
          nickname1: "모두와 친해졌으면 좋겠어!",
          nickname2: "사교력 갑 온화한 중재형 팀원",
          img: "/img/ESFJ.jpg",
          description:
            '[   "타고난 협력자로서 동료애가 많고 친절하며 능동적이에요",   "어색한 걸 참지 못하기 때문에 팀플 톡방에서 먼저 말 꺼내는 타입이에요",   "특유의 친화력으로 팀원들과 빨리 친해져요. 타고난 분위기 메이커예요",   "공감능력과 리액션이 뛰어나기 때문에, 사람들에게 호감도 잘 얻고 사회생활도 잘해요",   "눈치를 많이 보는 편이고, 남에게 싫은 소리 하는 거 싫어해요. 남들에게 잘 맞춰주고 인간관계에 신경을 많이 써요",   "상대방의 특성을 잘 파악하고 칭찬도 잘해요. 참을성이 많고 다른 사람을 돕는 것을 즐겨요",   "책임감과 계획력, 특유의 사교성으로 인해 팀장을 맡는 경우도 종종 있어요. 팀에서 중재자의 역할을 맡기도 해요" ]',
          name: "ESFJ",
        },
      ],
    });

    console.log("Seed data created successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();

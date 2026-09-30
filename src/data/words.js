// 单词数据集：四级 / 六级 / 托福 / 雅思
// 每个单词：word 英文, phonetic 音标, meaning 中文释义, example 英文例句, exampleCn 例句中文

export const categories = [
  {
    id: 'cet4',
    name: '大学英语四级',
    short: '四级',
    emoji: '🌸',
    color: 'pink',
    desc: '最基础的核心词汇，打好地基～'
  },
  {
    id: 'cet6',
    name: '大学英语六级',
    short: '六级',
    emoji: '🍃',
    color: 'mint',
    desc: '进阶词汇，让表达更精准。'
  },
  {
    id: 'toefl',
    name: '托福 TOEFL',
    short: '托福',
    emoji: '🌷',
    color: 'lavender',
    desc: '学术场景高频词，冲高分！'
  },
  {
    id: 'ielts',
    name: '雅思 IELTS',
    short: '雅思',
    emoji: '🍋',
    color: 'lemon',
    desc: '生活与学术兼顾的实用词库。'
  }
]

export const wordData = {
  cet4: [
    { word: 'abandon', phonetic: '/əˈbændən/', meaning: 'v. 抛弃，放弃', example: 'They had to abandon the plan because of the bad weather.', exampleCn: '由于天气恶劣，他们不得不放弃这个计划。' },
    { word: 'abundant', phonetic: '/əˈbʌndənt/', meaning: 'adj. 丰富的，充裕的', example: 'The region has abundant natural resources.', exampleCn: '该地区拥有丰富的自然资源。' },
    { word: 'accomplish', phonetic: '/əˈkʌmplɪʃ/', meaning: 'v. 完成，实现', example: 'She accomplished her goal with great effort.', exampleCn: '她付出了巨大努力实现了目标。' },
    { word: 'accurate', phonetic: '/ˈækjərət/', meaning: 'adj. 准确的，精确的', example: 'The report provides accurate information.', exampleCn: '这份报告提供了准确的信息。' },
    { word: 'acquire', phonetic: '/əˈkwaɪər/', meaning: 'v. 获得，取得', example: 'He acquired a good knowledge of English.', exampleCn: '他掌握了良好的英语知识。' },
    { word: 'adequate', phonetic: '/ˈædɪkwət/', meaning: 'adj. 足够的，适当的', example: 'We need adequate preparation for the exam.', exampleCn: '我们需要为考试做充分的准备。' },
    { word: 'ambition', phonetic: '/æmˈbɪʃn/', meaning: 'n. 雄心，抱负', example: 'Her ambition is to become a doctor.', exampleCn: '她的抱负是成为一名医生。' },
    { word: 'analyze', phonetic: '/ˈænəlaɪz/', meaning: 'v. 分析', example: 'We should analyze the problem carefully.', exampleCn: '我们应该仔细分析这个问题。' },
    { word: 'apparent', phonetic: '/əˈpærənt/', meaning: 'adj. 明显的，表面的', example: 'It is apparent that he is not interested.', exampleCn: '显然他并不感兴趣。' },
    { word: 'appropriate', phonetic: '/əˈproʊpriət/', meaning: 'adj. 适当的，合适的', example: 'Choose clothing appropriate for the occasion.', exampleCn: '选择适合该场合的服装。' },
    { word: 'assess', phonetic: '/əˈses/', meaning: 'v. 评估，评定', example: 'Teachers assess students progress regularly.', exampleCn: '老师定期评估学生的进步。' },
    { word: 'assume', phonetic: '/əˈsuːm/', meaning: 'v. 假定，承担', example: 'We assume that the meeting will be on time.', exampleCn: '我们假设会议将准时开始。' },
    { word: 'adapt', phonetic: '/əˈdæpt/', meaning: 'v. 适应，改编', example: 'He found it hard to adapt to the new school.', exampleCn: '他发现很难适应新学校。' },
    { word: 'anticipate', phonetic: '/ænˈtɪsɪpeɪt/', meaning: 'v. 预期，预料', example: 'We anticipate a rise in prices next year.', exampleCn: '我们预期明年价格会上涨。' },
    { word: 'appreciate', phonetic: '/əˈpriːʃieɪt/', meaning: 'v. 欣赏，感激', example: 'I really appreciate your kind help.', exampleCn: '我非常感激你的善意帮助。' },
    { word: 'arbitrary', phonetic: '/ˈɑːrbɪtreri/', meaning: 'adj. 任意的，武断的', example: 'The decision seemed completely arbitrary.', exampleCn: '这个决定似乎完全武断。' },
    { word: 'attribute', phonetic: '/əˈtrɪbjuːt/', meaning: 'v. 把…归因于', example: 'She attributes her success to hard work.', exampleCn: '她把成功归因于努力。' },
    { word: 'authentic', phonetic: '/ɔːˈθentɪk/', meaning: 'adj. 真实的，正宗的', example: 'We bought authentic local handicrafts.', exampleCn: '我们买了正宗的当地手工艺品。' },
    { word: 'avoid', phonetic: '/əˈvɔɪd/', meaning: 'v. 避免，避开', example: 'You should avoid making the same mistake.', exampleCn: '你应该避免犯同样的错误。' },
    { word: 'atmosphere', phonetic: '/ˈætməsfɪr/', meaning: 'n. 大气，氛围', example: 'The atmosphere in the room was calm.', exampleCn: '房间里的氛围很平静。' }
  ],
  cet6: [
    { word: 'abstract', phonetic: '/ˈæbstrækt/', meaning: 'adj. 抽象的 n. 摘要', example: 'The concept is too abstract to understand.', exampleCn: '这个概念太抽象，难以理解。' },
    { word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', meaning: 'v. 积累，积聚', example: 'He accumulated a lot of wealth over the years.', exampleCn: '这些年来他积累了大量财富。' },
    { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaning: 'adj. 模棱两可的', example: 'The instructions were ambiguous and confusing.', exampleCn: '这些说明含糊不清，令人困惑。' },
    { word: 'comprehensive', phonetic: '/ˌkɑːmprɪˈhensɪv/', meaning: 'adj. 综合的，全面的', example: 'The book offers a comprehensive overview.', exampleCn: '这本书提供了全面的概述。' },
    { word: 'conspicuous', phonetic: '/kənˈspɪkjuəs/', meaning: 'adj. 显眼的，明显的', example: 'The red sign is conspicuous from far away.', exampleCn: '那个红色标志从远处就很显眼。' },
    { word: 'deteriorate', phonetic: '/dɪˈtɪriəreɪt/', meaning: 'v. 恶化，变坏', example: 'Air quality may deteriorate in winter.', exampleCn: '冬季空气质量可能恶化。' },
    { word: 'elaborate', phonetic: '/ɪˈlæbərət/', meaning: 'adj. 精心制作的 v. 详尽阐述', example: 'She gave an elaborate explanation of the plan.', exampleCn: '她对该计划给出了详尽的解释。' },
    { word: 'fragile', phonetic: '/ˈfrædʒaɪl/', meaning: 'adj. 脆弱的，易碎的', example: 'The vase is fragile, handle it with care.', exampleCn: '这个花瓶易碎，请小心轻放。' },
    { word: 'hypothesis', phonetic: '/haɪˈpɑːθəsɪs/', meaning: 'n. 假说，假设', example: 'The hypothesis needs further testing.', exampleCn: '这个假说需要进一步检验。' },
    { word: 'inevitable', phonetic: '/ɪnˈevɪtəbl/', meaning: 'adj. 不可避免的', example: 'Change is inevitable in our life.', exampleCn: '生活中的变化不可避免。' },
    { word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaning: 'n. 范例，范式', example: 'This marks a new paradigm in science.', exampleCn: '这标志着科学中的一个新范式。' },
    { word: 'proficient', phonetic: '/prəˈfɪʃnt/', meaning: 'adj. 熟练的，精通的', example: 'She is proficient in three languages.', exampleCn: '她精通三种语言。' },
    { word: 'accommodate', phonetic: '/əˈkɑːmədeɪt/', meaning: 'v. 容纳，提供住宿', example: 'The hotel can accommodate 200 guests.', exampleCn: '这家酒店可容纳200名客人。' },
    { word: 'adjacent', phonetic: '/əˈdʒeɪsnt/', meaning: 'adj. 邻近的，相邻的', example: 'The garden is adjacent to the house.', exampleCn: '花园与房子相邻。' },
    { word: 'cherish', phonetic: '/ˈtʃerɪʃ/', meaning: 'v. 珍惜，珍爱', example: 'We cherish the time we spent together.', exampleCn: '我们珍惜在一起的时光。' },
    { word: 'correlate', phonetic: '/ˈkɔːrəleɪt/', meaning: 'v. 使相互关联', example: 'Regular sleep correlates with good health.', exampleCn: '规律睡眠与健康相关。' },
    { word: 'deficit', phonetic: '/ˈdefɪsɪt/', meaning: 'n. 赤字，亏损', example: 'The company faces a serious financial deficit.', exampleCn: '公司面临严重的财政赤字。' },
    { word: 'explicit', phonetic: '/ɪkˈsplɪsɪt/', meaning: 'adj. 明确的，清楚的', example: 'He gave explicit instructions to the team.', exampleCn: '他向团队给出了明确的指示。' },
    { word: 'mandatory', phonetic: '/ˈmændətɔːri/', meaning: 'adj. 强制的，义务的', example: 'Wearing a seatbelt is mandatory.', exampleCn: '系安全带是强制性的。' },
    { word: 'simultaneous', phonetic: '/ˌsaɪmlˈteɪniəs/', meaning: 'adj. 同时发生的', example: 'The two explosions were simultaneous.', exampleCn: '两次爆炸同时发生。' }
  ],
  toefl: [
    { word: 'advocate', phonetic: '/ˈædvəkeɪt/', meaning: 'v. 提倡，拥护 n. 拥护者', example: 'They advocate for environmental protection.', exampleCn: '他们提倡环境保护。' },
    { word: 'coherent', phonetic: '/koʊˈhɪrənt/', meaning: 'adj. 连贯的，有条理的', example: 'He gave a coherent and clear speech.', exampleCn: '他做了一场连贯清晰的演讲。' },
    { word: 'dilemma', phonetic: '/dɪˈlemə/', meaning: 'n. 困境，进退两难', example: 'She faced a moral dilemma at work.', exampleCn: '她在工作中面临一个道德上的两难困境。' },
    { word: 'empirical', phonetic: '/ɪmˈpɪrɪkl/', meaning: 'adj. 实证的，经验主义的', example: 'The study is based on empirical evidence.', exampleCn: '这项研究基于实证证据。' },
    { word: 'fluctuate', phonetic: '/ˈflʌktʃueɪt/', meaning: 'v. 波动，起伏', example: 'Prices fluctuate with the market.', exampleCn: '价格随市场波动。' },
    { word: 'mitigate', phonetic: '/ˈmɪtɪɡeɪt/', meaning: 'v. 减轻，缓解', example: 'We must mitigate the effects of climate change.', exampleCn: '我们必须缓解气候变化的影响。' },
    { word: 'phenomenon', phonetic: '/fəˈnɑːmɪnən/', meaning: 'n. 现象', example: 'Global warming is a global phenomenon.', exampleCn: '全球变暖是一个全球性现象。' },
    { word: 'predominant', phonetic: '/prɪˈdɑːmɪnənt/', meaning: 'adj. 占主导地位的', example: 'The predominant language here is English.', exampleCn: '这里的主导语言是英语。' },
    { word: 'scrutinize', phonetic: '/ˈskruːtənaɪz/', meaning: 'v. 仔细检查', example: 'The committee will scrutinize the plan.', exampleCn: '委员会将仔细审查该计划。' },
    { word: 'synthesis', phonetic: '/ˈsɪnθəsɪs/', meaning: 'n. 综合，合成', example: 'The theory is a synthesis of old ideas.', exampleCn: '该理论是旧观点的综合。' },
    { word: 'ubiquitous', phonetic: '/juːˈbɪkwɪtəs/', meaning: 'adj. 无处不在的', example: 'Smartphones are ubiquitous today.', exampleCn: '如今智能手机无处不在。' },
    { word: 'viable', phonetic: '/ˈvaɪəbl/', meaning: 'adj. 可行的，能存活的', example: 'They proposed a viable solution.', exampleCn: '他们提出了一个可行的方案。' },
    { word: 'ascertain', phonetic: '/ˌæsərˈteɪn/', meaning: 'v. 查明，确定', example: 'We need to ascertain the facts first.', exampleCn: '我们需要先查明事实。' },
    { word: 'collaborate', phonetic: '/kəˈlæbəreɪt/', meaning: 'v. 合作，协作', example: 'They collaborate on the research project.', exampleCn: '他们在该研究项目上合作。' },
    { word: 'consensus', phonetic: '/kənˈsensəs/', meaning: 'n. 共识', example: 'The group finally reached a consensus.', exampleCn: '小组最终达成了共识。' },
    { word: 'disseminate', phonetic: '/dɪˈsemɪneɪt/', meaning: 'v. 传播，散布', example: 'They disseminate information online.', exampleCn: '他们在网上传播信息。' },
    { word: 'inherent', phonetic: '/ɪnˈhɪrənt/', meaning: 'adj. 内在的，固有的', example: 'There is a risk inherent in any plan.', exampleCn: '任何计划都固有风险。' },
    { word: 'rigorous', phonetic: '/ˈrɪɡərəs/', meaning: 'adj. 严格的，严密的', example: 'The study used rigorous methods.', exampleCn: '该研究使用了严密的方法。' },
    { word: 'trajectory', phonetic: '/trəˈdʒektəri/', meaning: 'n. 轨迹，发展轨迹', example: 'The company shows a strong growth trajectory.', exampleCn: '公司呈现出强劲的发展轨迹。' }
  ],
  ielts: [
    { word: 'alleviate', phonetic: '/əˈliːvieɪt/', meaning: 'v. 减轻，缓解', example: 'The medicine can alleviate the pain.', exampleCn: '这种药可以缓解疼痛。' },
    { word: 'compensate', phonetic: '/ˈkɑːmpenseɪt/', meaning: 'v. 补偿，赔偿', example: 'The company will compensate the victims.', exampleCn: '公司将赔偿受害者。' },
    { word: 'controversial', phonetic: '/ˌkɑːntrəˈvɜːrʃl/', meaning: 'adj. 有争议的', example: 'The topic is highly controversial.', exampleCn: '这个话题极具争议性。' },
    { word: 'cultivate', phonetic: '/ˈkʌltɪveɪt/', meaning: 'v. 培养，耕作', example: 'Farmers cultivate the land for crops.', exampleCn: '农民耕作土地种植庄稼。' },
    { word: 'diverse', phonetic: '/daɪˈvɜːrs/', meaning: 'adj. 多样的，不同的', example: 'The city has a diverse population.', exampleCn: '这座城市人口多样。' },
    { word: 'exacerbate', phonetic: '/ɪɡˈzæsərbeɪt/', meaning: 'v. 使恶化，加重', example: 'The policy may exacerbate inequality.', exampleCn: '该政策可能加剧不平等。' },
    { word: 'fundamental', phonetic: '/ˌfʌndəˈmentl/', meaning: 'adj. 基本的，根本的', example: 'Education is fundamental to society.', exampleCn: '教育是社会的基础。' },
    { word: 'inhibit', phonetic: '/ɪnˈhɪbɪt/', meaning: 'v. 抑制，阻止', example: 'Fear can inhibit personal growth.', exampleCn: '恐惧会抑制个人成长。' },
    { word: 'negligible', phonetic: '/ˈneɡlɪdʒəbl/', meaning: 'adj. 可忽略的，微不足道的', example: 'The risk is negligible in this case.', exampleCn: '在这种情况下风险微乎其微。' },
    { word: 'prosperity', phonetic: '/prɑːˈsperəti/', meaning: 'n. 繁荣，兴旺', example: 'Economic prosperity benefits everyone.', exampleCn: '经济繁荣惠及每个人。' },
    { word: 'subtle', phonetic: '/ˈsʌtl/', meaning: 'adj. 微妙的，精细的', example: 'There is a subtle difference between them.', exampleCn: '它们之间有着微妙的区别。' },
    { word: 'vigorous', phonetic: '/ˈvɪɡərəs/', meaning: 'adj. 精力充沛的，有力的', example: 'He took vigorous exercise every morning.', exampleCn: '他每天早晨进行剧烈运动。' },
    { word: 'coincide', phonetic: '/ˌkoʊɪnˈsaɪd/', meaning: 'v. 同时发生，一致', example: 'Our views coincide on this matter.', exampleCn: '我们在此事上的观点一致。' },
    { word: 'depict', phonetic: '/dɪˈpɪkt/', meaning: 'v. 描绘，描述', example: 'The painting depicts a quiet village.', exampleCn: '这幅画描绘了一个宁静的村庄。' },
    { word: 'eradicate', phonetic: '/ɪˈrædɪkeɪt/', meaning: 'v. 根除，消灭', example: 'We aim to eradicate poverty.', exampleCn: '我们的目标是消除贫困。' },
    { word: 'formulate', phonetic: '/ˈfɔːrmjuleɪt/', meaning: 'v. 制定，明确表达', example: 'They formulated a clear new policy.', exampleCn: '他们制定了一项清晰的新政策。' },
    { word: 'implement', phonetic: '/ˈɪmplɪment/', meaning: 'v. 实施，执行', example: 'The school will implement the plan.', exampleCn: '学校将执行该计划。' },
    { word: 'reconcile', phonetic: '/ˈrekənsaɪl/', meaning: 'v. 使和解，调和', example: 'They reconciled their differences at last.', exampleCn: '他们最终调和了分歧。' },
    { word: 'threshold', phonetic: '/ˈθreʃhoʊld/', meaning: 'n. 门槛，临界值', example: 'We are at the threshold of a new era.', exampleCn: '我们正处于新时代的门槛。' },
    { word: 'underpin', phonetic: '/ˌʌndərˈpɪn/', meaning: 'v. 支撑，巩固', example: 'Trust underpins a good relationship.', exampleCn: '信任支撑着良好的关系。' }
  ]
}

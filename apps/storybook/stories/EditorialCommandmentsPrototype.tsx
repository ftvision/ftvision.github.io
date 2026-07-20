import { useMemo, useState } from "react";

import { PassContent, ReadingDepth } from "@/components/content/ReadingDepth";

import fullEssayEn from "../../blog/content/essays/ten-commandments-for-product.mdx?raw";
import fullEssayZh from "../../blog/content/essays/ten-commandments-for-product-zh.mdx?raw";
import readingPassesEn from "../../blog/content/essay-reading/ten-commandments-for-product.mdx?raw";

import "./editorial-reading-prototype.css";
import "./editorial-commandments-prototype.css";
import {
  deriveReadingPass,
  EditorialMdxReader,
  getReadingPassSource,
} from "./EditorialMdxReader";

type Language = "en" | "zh";

interface EditorialCommandmentsPrototypeProps {
  initialLanguage?: Language;
}

interface CommandmentCopy {
  title: string;
  excerpt: string;
}

interface CommandmentsCopy {
  classification: string;
  description: string;
  title: string;
  authorLabel: string;
  dateLabel: string;
  extentLabel: string;
  extent: string;
  prefaceLabel: string;
  preface: string;
  introduction: string[];
  indexTitle: string;
  bodyLabel: string;
  closing: string;
  farewell: string;
  nextLabel: string;
  nextTitle: string;
  folio: string;
  published: string;
  commandments: CommandmentCopy[];
}

const copy: Record<Language, CommandmentsCopy> = {
  en: {
    classification: "Opinion · Product",
    description:
      "A record of mistakes I made and watched others make: ten commandments for building product, and the self-deceptions each one guards against.",
    title: "The Ten Commandments for Building Product",
    authorLabel: "By",
    dateLabel: "Published",
    extentLabel: "Extent",
    extent: "10 commandments",
    prefaceLabel: "A record of mistakes",
    preface:
      "I spent the past two years at an AI agent startup. We took three swings, across three pivots: a Minecraft coplayer called Project Sid, a general-purpose desktop agent we called Fairies, and finally an Excel coworker called Shortcut. As the founding engineer I had a front-row seat to nearly every decision. I watched the early bets fail, and I watched the team turn the last one into a product that found fit, and saw what that took. So this is a record of mistakes, not a recipe for success. Following all ten earns you the right to maybe succeed; nothing earns you the success itself.",
    introduction: [
      "This is about going from zero to one: building a product before it has found product-market fit, when you still don’t know who your user is, whether they want this, or whether it should exist at all. There is one disease underneath most of what follows. Every evasion that promises to spare you painful, first-hand contact with reality is an illusion that feels like progress and isn’t.",
      "AI makes this more dangerous, not less. It lowers the cost of building so far that the old ways of avoiding reality now look like extraordinary productivity. The product is still an organism that has to evolve through contact with the world. It is not a spec you can get right in advance by thinking hard enough, and it is not a system an agent can scaffold into truth before anyone wants it.",
    ],
    indexTitle: "The Ten",
    bodyLabel: "The commandments",
    closing:
      "A last word on the elephant in the room. Almost every illusion in this essay now runs on the same accelerant: AI makes avoiding the real work feel free. It will write the architecture, generate the features, produce the lines, and make a technical breakthrough appear almost immediately, all without your ever meeting a user. That is why these ten matter more now, not less. When building gets this cheap, building stops being the thing that separates you; judgment does.",
    farewell: "Best wishes to you on building your product.",
    nextLabel: "Next essay",
    nextTitle: "Access Denied Is Not a Moat",
    folio: "Algo Mind · Essay 03",
    published: "First published June 15, 2026",
    commandments: [
      {
        title:
          "You shall be honest about whether you are committed to the product, or only in love with the idea.",
        excerpt:
          "Building means enduring its pain yourself, and any move to delegate that pain is proof the commitment was never there. The pain I mean is not the engineering. You can delegate execution; the pain you cannot delegate is the grounding and the rejection: figuring out who your users actually are, going to them yourself, selling the thing yourself, watching them ignore what you built, being told no to your face, and sitting in the uncertainty without a dashboard to hide behind.",
      },
      {
        title:
          "You shall not mistake self-expression for knowledge of your user.",
        excerpt:
          "Let your taste seed the product, but never let it certify the market. Your taste is a legitimate seed, the point of view and conviction a product needs to begin. But a seed is a hypothesis, not knowledge. The only question that settles anything is whether a real person on the other side wants it.",
      },
      {
        title: "You shall not pretend to know your user.",
        excerpt:
          "Not knowing who your user is is bad, but pretending you know is much worse, because it quietly sets the priorities for everything you build, and sets them toward a user you invented instead of one you found. “Developers” is not a user. Neither is “builders,” or “AI pioneers,” or “Minecraft players.” Until you can name exactly which of them you serve, you cannot decide what matters in the product.",
      },
      {
        title: "You shall not mistake a breakthrough for a product.",
        excerpt:
          "Model capability jumped so far, so fast, that a generation of researchers and engineers came to feel a breakthrough is self-evidently powerful, and ChatGPT seemed to prove the rest: that a breakthrough can simply become a product. It is a myth. A capability is an input, not a finished good. A product is the translation of that input into a met need.",
      },
      {
        title:
          "You shall not throw the problem of how to use your product onto your users.",
        excerpt:
          "Great products carry clear functional affordance: the user simply sees how to use them. Good products carry a clear onboarding path that adapts the user to the product over time. Products built on genuinely new technology arrive with neither, and articulating the usage is your job, not the user’s. Clear use is your design, not their puzzle to solve.",
      },
      {
        title:
          "You shall not treat every feature as equal, nor chase one more feature before launch.",
        excerpt:
          "Focus is the discipline of saying no. It is not working hard on everything; it is deciding what not to build, and that refusal is the muscle. Your features are the message you send users about what your product is. A small, sharp core tells them exactly what this is and how to use it. The longer the feature list, the muddier the message.",
      },
      {
        title:
          "You shall be driven by outcomes, not activity, and ship early enough to face the verdict.",
        excerpt:
          "Shipping ten pull requests and five features is activity. It feels like progress and frequently isn’t. AI can compress implementation time. It cannot compress the market’s verdict. Cheap code does not move a product to market any faster unless it tightens the loop: ship, measure the outcome you actually care about, learn, improve, and go again, fast.",
      },
      {
        title:
          "You shall not build for a million users before you have a thousand.",
        excerpt:
          "Your product is an organism, not a spec. Standing up a system that holds a million users when you have zero feels like rigor. It is procrastination with excellent posture. Before you have a clear signal, building for a million is premature work on a future that hasn’t arrived.",
      },
      {
        title:
          "You shall not assume a good product sells itself; you are its missionary.",
        excerpt:
          "Finishing the first version is the starting line, not the finish. A good product does not introduce itself, and it does not get paid for on its own. Most of the people who would love what you built will never know it exists unless someone makes them, and that someone is you.",
      },
      {
        title: "You shall have patience; attention is a spark, not the fuel.",
        excerpt:
          "Building a product takes patience. The work is to keep making it better, week after week, long after the first version’s thrill is gone. Attention is not growth. Attention is a spark; the product is the fuel, and a spark over an empty tank goes out in seconds.",
      },
    ],
  },
  zh: {
    classification: "观点 · 产品",
    description:
      "一份关于我亲身犯过、也亲眼见过的产品错误记录：十条产品诫命，以及每一条所针对的自我欺骗。",
    title: "产品十诫",
    authorLabel: "作者",
    dateLabel: "发布",
    extentLabel: "篇幅",
    extent: "十条诫命",
    prefaceLabel: "一份错误记录",
    preface:
      "过去两年，我在一家 AI 智能体创业公司工作。我们做过三次尝试，也经历过三次转向：Minecraft 陪玩 Project Sid、一个叫 Fairies 的通用桌面智能体，最后是一个叫 Shortcut 的 Excel 同事。作为创始工程师，我几乎坐在每一个决策的前排。我看着早期赌注失败，也看着团队把最后一个方向做成一个真正找到适配的产品，并且看见那件事到底需要什么。所以这是一份错误记录，不是成功配方。把这十条都做到，只是让你获得“也许能成功”的资格；没有任何东西能保证成功本身。",
    introduction: [
      "这篇文章讨论的是从零到一：在产品还没有找到产品市场匹配之前，你仍然不知道用户是谁，不知道他们是否想要这个东西，也不知道它到底是否应该存在。下面大部分问题背后有同一种病：你想绕开和现实的一手接触，因为那件事太疼。那些做法都很像进展。它们让人觉得自己在前进。其实你只是站在原地，同时觉得自己很忙。",
      "AI 让这件事更危险，而不是更安全。它把构建成本降到如此之低，以至于旧的逃避现实方式现在看起来像惊人的生产力。产品仍然是一个有机体，必须通过和世界接触而演化。它不是一份你只要足够认真思考就能提前写对的规格书，也不是一个智能体能在有人想要它之前就替你搭成真理的系统。",
    ],
    indexTitle: "十诫",
    bodyLabel: "诫命正文",
    closing:
      "最后说一句房间里的大象。这篇文章里几乎每一种幻觉，现在都跑在同一种助燃剂上：AI 让逃避真正的工作显得免费。它会写架构，生成功能，产出代码，很快演示出技术突破，而你可以从头到尾不见一个用户。这就是为什么这十条现在更重要，而不是更不重要。当构建变得这么便宜，构建本身就不再是区分你的东西；判断才是。",
    farewell: "祝你顺利构建自己的产品。",
    nextLabel: "下一篇",
    nextTitle: "拒绝访问不是护城河",
    folio: "Algo Mind · 文章 03",
    published: "首次发布于 2026 年 6 月 15 日",
    commandments: [
      {
        title:
          "你要诚实面对：你是真心想做成一个产品，还是只是叶公好龙，喜欢“做产品”这个想法。",
        excerpt:
          "做产品意味着你必须亲自承受它的痛苦；如果你总想把这种痛苦交给别人，那就说明你并不是真的想把这个产品做成。我说的痛苦不是软件开发上的麻烦。执行可以委托，但扎根现实和承受拒绝不能委托：亲自搞清楚你的用户到底是谁，亲自去找他们，亲自卖你的产品，亲眼看着他们无视你做出来的东西，亲耳听他们当面说不。",
      },
      {
        title: "你不可把自我表达误认为你了解用户。",
        excerpt:
          "可以让你的品味成为产品的种子，但不要让它替市场盖章。品味是一个可以成立的起点，是产品开始时需要的观点和信念。但种子是假设，不是知识。唯一能决定一切的问题，是另一端是否有一个真实的人想要它。",
      },
      {
        title: "你不可假装自己知道用户是谁。",
        excerpt:
          "不知道用户是谁当然不好，但假装自己知道要糟糕得多，因为它会安静地设定你构建一切东西时的优先级，而且把这些优先级指向一个你发明出来的用户，而不是你找到的用户。“开发者”不是用户。“builders”不是用户。“AI pioneers”不是用户。“Minecraft players”也不是用户。",
      },
      {
        title: "你不可把技术突破误认为产品。",
        excerpt:
          "模型能力跳得太远、太快，以至于一代研究者和工程师很容易把技术突破本身当成力量，而 ChatGPT 好像证明了剩下的一步会自然发生：一个技术突破可以直接变成一个产品。这是神话。能力是输入，不是成品。产品要做的，是把能力转化成某个用户真正需要、也真的会用的东西。",
      },
      {
        title: "你不可把“如何使用你的产品”这个问题丢给用户。",
        excerpt:
          "伟大的产品有清楚的功能可供性：用户就是能一眼看出该怎么用。好的产品有清楚的引导路径，会逐步让用户适应产品。真正建立在新技术上的产品，一开始通常两者都没有，而把用法说清楚是你的工作，不是用户的工作。清楚的使用方式是你的设计，不是他们要解的谜题。",
      },
      {
        title:
          "你不可把每个功能都看得一样重要，也不可在发布前继续追逐“再多一个功能”。",
        excerpt:
          "专注是说不的纪律。它不是努力做所有事情；它是决定什么不做，而这种拒绝能力要靠反复练出来。你的功能列表就是你发送给用户的信息，告诉他们你的产品到底是什么。一个小而锋利的核心，会让他们立刻知道这是什么、该怎么用。功能列表越长，信息越浑。",
      },
      {
        title: "你要注重结果，而非过程；并且要足够早地发布，去面对现实。",
        excerpt:
          "发十个 pull request 和五个功能，是动作。它感觉像进展，但经常不是。AI 可以压缩实现时间。它不能替你通过市场检验。便宜代码不会让产品更快抵达市场，除非它收紧那个闭环：发布，测量你真正关心的结果，学习，改进，再来一次，而且要快。",
      },
      {
        title: "你不可在拥有一千个用户之前，就追求能服务一百万用户的工程基建。",
        excerpt:
          "你的产品是有机体，不是规格书。当你有零个用户时，搭一个能承载一百万用户的系统，感觉像严谨。它是姿态优雅的拖延。在你有清楚信号之前，提前追求能服务一百万用户的工程基建，是在替一个尚未到来的未来干活。",
      },
      {
        title: "你不可假设好产品自然就卖得好；你就是它的布道者。",
        excerpt:
          "完成第一个版本是起跑线，不是终点线。好产品不会自己介绍自己，也不会自己让别人付钱。大多数可能会喜欢这个产品的人，永远不会知道它存在，也不会看见它能做什么，除非有人把它带到他们面前，而那个人就是你。",
      },
      {
        title: "你要有耐心；流量只能带来人，不能留住人。",
        excerpt:
          "做产品需要耐心。工作是持续让它变好，一周又一周，远在第一个版本的兴奋消失之后。关注不是增长。流量只能带来人；真正能留住人的，是产品。",
      },
    ],
  },
};

function CommandmentsMasthead({
  language,
  mode,
  onLanguageChange,
  onToggleMode,
}: {
  language: Language;
  mode: "light" | "dark";
  onLanguageChange: (language: Language) => void;
  onToggleMode: () => void;
}) {
  return (
    <header className="reading-prototype__masthead">
      <a className="reading-prototype__wordmark" href="/">
        Algo Mind
      </a>

      <nav className="reading-prototype__nav" aria-label="Primary navigation">
        <a aria-current="page" href="/essays/">
          Essays
        </a>
        <a href="/series/">Series</a>
        <a href="/about/">About</a>
      </nav>

      <div className="reading-prototype__utilities commandments-prototype__utilities">
        <div aria-label="Article language">
          <button
            aria-pressed={language === "en"}
            type="button"
            onClick={() => onLanguageChange("en")}
          >
            EN
          </button>
          <button
            aria-pressed={language === "zh"}
            lang="zh"
            type="button"
            onClick={() => onLanguageChange("zh")}
          >
            中文
          </button>
        </div>
        <button type="button" onClick={onToggleMode}>
          {mode === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}

function CommandmentsTitle({ language }: { language: Language }) {
  if (language === "zh") {
    return (
      <h1>
        产品
        <br />
        <em>十诫</em>
      </h1>
    );
  }

  return (
    <h1>
      The Ten
      <br />
      <em>Commandments</em>
      <br />
      for Building Product
    </h1>
  );
}

export function EditorialCommandmentsPrototype({
  initialLanguage = "en",
}: EditorialCommandmentsPrototypeProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const content = copy[language];
  const fullSource = language === "en" ? fullEssayEn : fullEssayZh;
  const condensedReading = useMemo(() => {
    if (language === "en") {
      return {
        spineSource: getReadingPassSource(readingPassesEn, "spine"),
        argumentSource: getReadingPassSource(readingPassesEn, "argument"),
      };
    }

    return {
      spineBlocks: deriveReadingPass(fullEssayZh, "spine"),
      argumentBlocks: deriveReadingPass(fullEssayZh, "argument"),
    };
  }, [language]);

  const toggleMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    document.documentElement.dataset.mode = nextMode;
    setMode(nextMode);
  };

  return (
    <div className="reading-prototype commandments-prototype">
      <CommandmentsMasthead
        language={language}
        mode={mode}
        onLanguageChange={setLanguage}
        onToggleMode={toggleMode}
      />

      <main
        className={`reading-prototype__page commandments-essay commandments-essay--${language}`}
        lang={language === "zh" ? "zh-Hans" : "en"}
      >
        <header className="commandments-essay__title-page">
          <div className="bound-essay__classification">
            <span>{language === "en" ? "Essay 03" : "文章 03"}</span>
            <span>{content.classification}</span>
          </div>
          <CommandmentsTitle language={language} />
          <div className="commandments-essay__deck">
            <p>{content.description}</p>
            <dl>
              <div>
                <dt>{content.authorLabel}</dt>
                <dd>Feitong Yang</dd>
              </div>
              <div>
                <dt>{content.dateLabel}</dt>
                <dd>
                  {language === "en" ? "June 15, 2026" : "2026 年 6 月 15 日"}
                </dd>
              </div>
              <div>
                <dt>{content.extentLabel}</dt>
                <dd>{content.extent}</dd>
              </div>
            </dl>
          </div>
        </header>

        <ReadingDepth
          ariaLabel={language === "en" ? "Read it three times" : "读三遍"}
          className="commandments-reading-depth"
          defaultPass="full"
          heading={language === "en" ? "Read it three times" : "读三遍"}
          passCopy={
            language === "en"
              ? {
                  spine: {
                    label: "Spine",
                    time: "5 min",
                    summary: "The opening claim and all ten propositions.",
                  },
                  argument: {
                    label: "Argument",
                    time: "15 min",
                    summary:
                      "Every commandment with its load-bearing reasoning.",
                  },
                  full: {
                    label: "Full",
                    time: "45 min",
                    summary:
                      "The complete published essay, examples, notes, and links.",
                  },
                }
              : {
                  spine: {
                    label: "骨架",
                    time: "5 分钟",
                    summary: "开篇论点和完整十条诫命。",
                  },
                  argument: {
                    label: "论证",
                    time: "15 分钟",
                    summary: "每条诫命及其最关键的论证段落。",
                  },
                  full: {
                    label: "全文",
                    time: "45 分钟",
                    summary: "完整已发表文章、案例、注释和链接。",
                  },
                }
          }
          storageKey={`algo-mind-product-commandments-${language}`}
        >
          <PassContent pass="spine">
            <EditorialMdxReader
              blocks={condensedReading.spineBlocks}
              language={language}
              source={condensedReading.spineSource}
            />
          </PassContent>
          <PassContent pass="argument">
            <EditorialMdxReader
              blocks={condensedReading.argumentBlocks}
              language={language}
              source={condensedReading.argumentSource}
            />
          </PassContent>
          <PassContent pass="full">
            <EditorialMdxReader language={language} source={fullSource} />
          </PassContent>
        </ReadingDepth>

        <nav className="bound-essay__next" aria-label="Essay navigation">
          <div>
            <span>{content.nextLabel}</span>
            <a href="/essays/access-denied-is-not-a-moat/">
              {content.nextTitle}
            </a>
          </div>
          <span>04 / 09</span>
        </nav>

        <footer className="reading-prototype__folio">
          <span>{content.folio}</span>
          <span>{content.published}</span>
        </footer>
      </main>
    </div>
  );
}

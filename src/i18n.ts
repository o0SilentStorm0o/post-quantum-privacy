export type Locale = "en" | "cs" | "de"

export interface LanguageOption {
  code: Locale
  label: string
  nativeName: string
  flag: string
}

interface BulletWithChildren {
  text: string
  items?: string[]
}

interface SectionListItem {
  title: string
  description: string
}

export interface WhitepaperCopy {
  header: {
    projectTagline: string
    projectTitle: string
    navLinks: { id: string; title: string }[]
    roadmapCta: string
  }
  hero: {
    badge: string
    title: string
    description: string
    ctas: {
      primary: { label: string; target: string }
      secondary: { label: string; target: string }
      tertiary: { label: string; target: string }
    }
    stats: { value: string; label: string; description: string }[]
    metaBadges: string[]
    tldr: {
      title: string
      paragraphs: string[]
      bullets: string[]
    }
  }
  highlights: SectionListItem[]
  keyConcepts: {
    security: SectionListItem
    privacy: SectionListItem
    compliance: SectionListItem
  }
  divider: { deepDive: string }
  sections: {
    motivation: {
      title: string
      problemHeading: string
      problemParagraph: string
      goalsHeading: string
      goalsList: string[]
    }
    threatModel: {
      title: string
      introHeading: string
      cards: SectionListItem[]
      note: string
    }
    architecture: {
      title: string
      bullets: BulletWithChildren[]
    }
    cryptography: {
      title: string
      sections: { heading: string; paragraph: string; list?: string[] }[]
      agilityCard: { title: string; paragraph: string }
    }
    transactionModel: {
      title: string
      overviewHeading: string
      overviewIntro: string
      overviewBullets: string[]
      primitivesHeading: string
      primitives: SectionListItem[]
      codeTitle: string
      code: string
    }
    spendFlow: {
      title: string
      intro: string
      steps: string[]
      cardText: string
    }
    walletUx: {
      title: string
      blocks: { heading: string; paragraphs: string[]; list?: string[] }[]
    }
    roadmap: {
      title: string
      phases: SectionListItem[]
      postLaunchHeading: string
      postLaunchParagraph: string
    }
    conclusion: {
      title: string
      paragraphs: string[]
      cardText: string
    }
  }
  infoBanner: string
  footer: { line1: string; line2: string }
  tableOfContents: {
    sections: { id: string; title: string; level: number }[]
    labels: {
      panelTitle: string
      panelSubtitle: string
      searchPlaceholder: string
      progress: string
      triggerLabel: string
      triggerHint: string
      sheetTitle: string
      sheetDescription: string
      now: string
      noMatches: string
      mobileAriaLabel: string
    }
  }
  scrollToTop: string
  themeToggle: { toLight: string; toDark: string }
  languageSelector: { label: string }
}

export const localeOrder: Locale[] = ["en", "cs", "de"]

export const languageOptions: Record<Locale, LanguageOption> = {
  en: { code: "en", label: "English", nativeName: "English", flag: "🇺🇸" },
  cs: { code: "cs", label: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
  de: { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" }
}

export const defaultLocale: Locale = "en"

export const translations: Record<Locale, WhitepaperCopy> = {
  en: {
    header: {
      projectTagline: "PQ-PRIV",
      projectTitle: "Post-Quantum Privacy L1",
      navLinks: [
        { id: "overview", title: "Overview" },
        { id: "architecture", title: "Architecture" },
        { id: "transaction-model", title: "Transactions" },
        { id: "wallet-ux", title: "Wallet UX" },
        { id: "roadmap", title: "Roadmap" }
      ],
      roadmapCta: "Roadmap"
    },
    hero: {
      badge: "Version 0.9 Draft · Updated Oct 2025",
      title: "The post-quantum privacy chain engineered for real-world adoption",
      description: "PQ-PRIV combines lattice signatures, STARK-proofed privacy, and intentional compliance flows to unlock a new class of digital money—private by default, auditable on demand, and futureproof against quantum shocks.",
      ctas: {
        primary: { label: "Jump to goals", target: "motivation" },
        secondary: { label: "Transaction model", target: "transaction-model" },
        tertiary: { label: "Wallet UX section", target: "wallet-ux" }
      },
      stats: [
        { value: "3", label: "Quantum-safe primitives", description: "Dilithium, SPHINCS+, STARK commitments" },
        { value: "150+", label: "Privacy throughput target", description: "Shielded tx/s with rollup assist" },
        { value: "< 30s", label: "Selective disclosures", description: "Average audit packet generation" }
      ],
      metaBadges: [
        "Date · 2025-10-03",
        "Authors · Project Team (pseudonymous)",
        "Release · Research whitepaper"
      ],
      tldr: {
        title: "TL;DR",
        paragraphs: [
          "PQ-PRIV is a new layer-1 built to bundle three non-negotiable guarantees: post-quantum safety, privacy by default, and operational pragmatism. Its architecture balances strong cryptography with practical node performance so the protocol can scale up without compromising compliance hooks."
        ],
        bullets: [
          "<strong>Post-quantum first:</strong> Dilithium signatures with SPHINCS+ fallback for crypto-agility.",
          "<strong>Privacy without obscurity:</strong> Stealth outputs, confidential amounts, and STARK-based proofs form the default spend path.",
          "<strong>Compliance on your terms:</strong> Selective disclosures, deposit subaddresses, and audit packets fit regulator-ready workflows."
        ]
      }
    },
    highlights: [
      {
        title: "Wallet-first flows",
        description: "Human-friendly copy, smart defaults, and contextual education keep sending private payments effortless."
      },
      {
        title: "Operator clarity",
        description: "Compliance surfaces turn selective disclosure into a guided wizard with policy-ready exports."
      },
      {
        title: "Developer ergonomics",
        description: "Modern SDKs, deterministic node APIs, and STARK tooling make integration predictable."
      }
    ],
    keyConcepts: {
      security: {
        title: "Post-Quantum Security",
        description: "CRYSTALS-Dilithium signatures and STARK-based proofs ensure resistance to quantum attacks using Shor's algorithm."
      },
      privacy: {
        title: "Strong Privacy",
        description: "Stealth addresses, confidential amounts, and one-of-many proofs provide unlinkable transactions by default."
      },
      compliance: {
        title: "Regulatory Compliance",
        description: "Selective disclosure mechanisms and exchange-friendly workflows enable institutional adoption without backdoors."
      }
    },
    divider: { deepDive: "Whitepaper Deep Dive" },
    sections: {
      motivation: {
        title: "1. Motivation & Goals",
        problemHeading: "Problem",
        problemParagraph: "Public blockchains are powerful but face competing needs: auditability for regulators and institutions; robust privacy for user safety and freedom; and cryptographic resilience as quantum computing advances. Existing systems address at most two of these well. Privacy coins often lack institutional compatibility; mainstream chains lack native privacy; nearly all chains rely on ECC primitives vulnerable to Shor's algorithm in a full-scale universal quantum computer.",
        goalsHeading: "Goals",
        goalsList: [
          "Native <strong>post-quantum signature scheme</strong> (primary) with conservative fallback(s).",
          "Native <strong>privacy primitives</strong> that hide sender/recipient and amounts by default.",
          "<strong>Selective disclosure</strong> facilities that let a user provide cryptographic proof of provenance.",
          "<strong>Operational pragmatism</strong>: practical transaction sizes, reasonable verification costs.",
          "<strong>Governance & transparency</strong> preventing authoritarian locking or secret keys."
        ]
      },
      threatModel: {
        title: "2. Threat Model",
        introHeading: "Adversaries Considered",
        cards: [
          { title: "Quantum Adversary", description: "Able to run Shor's/Grover's algorithms in the future" },
          { title: "Forensic Analyst", description: "Attempting chain analytics to deanonymize users" },
          { title: "Malicious Insiders", description: "Single or small group attempting to misuse privileged keys" },
          { title: "Regulatory Coercion", description: "Requests for disclosure, warrants, gag orders" }
        ],
        note: "<strong>Note:</strong> We explicitly do not design to help evade lawful investigations, but rather reduce attractiveness to criminals through compliant on/off ramps and user-controlled disclosure mechanisms."
      },
      architecture: {
        title: "3. High-level Architecture",
        bullets: [
          { text: "<strong>Layer-1 UTXO model</strong> with privacy default (stealth outputs + confidential amounts)" },
          { text: "<strong>Consensus:</strong> Configurable PoW for launch or hybrid PoW/PoS" },
          {
            text: "<strong>Crypto stack:</strong> Multi-algorithm (crypto-agile) approach:",
            items: [
              "<em>Primary signature:</em> CRYSTALS-Dilithium (lattice-based)",
              "<em>Fallback signature:</em> SPHINCS+ (hash-based)",
              "<em>Zero-knowledge primitives:</em> STARK-style proofs",
              "<em>Hash family:</em> SHA-2/SHA-3 family and BLAKE3"
            ]
          },
          { text: "<strong>Privacy primitives:</strong> Stealth addresses, confidential commitments, STARK-based one-of-many proofs" },
          { text: "<strong>Light clients:</strong> Utreexo accumulator commitments and succinct proofs" },
          { text: "<strong>Compliance primitives:</strong> Deposit-mode subaddresses + selective disclosure ZK proofs" }
        ]
      },
      cryptography: {
        title: "4. Cryptographic Choices & Rationale",
        sections: [
          {
            heading: "Primary Signature: CRYSTALS-Dilithium",
            paragraph: "<strong>Advantages:</strong> NIST acceptance family, reasonable signature sizes (~1–3 kB), fast keygen/sign/verify. Good tradeoff for L1."
          },
          {
            heading: "Fallback Signature: SPHINCS+",
            paragraph: "<strong>Advantages:</strong> Hash-based, conservative, large signatures (tens of kB) but resilience to unforeseen quantum advances; used as emergency fallback."
          },
          {
            heading: "Zero-knowledge: STARKs",
            paragraph: "<strong>Advantages:</strong> Transparent (no trusted setup) and hash-based primitives resilient to quantum attacks. Use STARKs for:",
            list: [
              "<strong>Range proofs</strong> (confidential amounts)",
              "<strong>One-of-many proofs</strong> (proving ownership of one output in a set)",
              "<strong>Succinct light-client proofs</strong> (verify chain predicate w/o full chain)"
            ]
          }
        ],
        agilityCard: {
          title: "Crypto-agility",
          paragraph: "The protocol includes a versioning system for signature and proof primitives. Blocks and transaction witnesses include algorithm version tags. New primitives can be introduced as protocol upgrades without invalidating old outputs."
        }
      },
      transactionModel: {
        title: "5. Transaction Model (UTXO, Privacy Features)",
        overviewHeading: "Overview",
        overviewIntro: "UTXO outputs carry:",
        overviewBullets: [
          "A one-time stealth destination derivation (unlinkable to recipient)",
          "A commitment to value (confidential)",
          "A small public tag for optional auditing or exchange deposit association"
        ],
        primitivesHeading: "Privacy Primitives in a Transaction",
        primitives: [
          { title: "Stealth Addresses", description: "Recipient publishes scan/spend keys. Sender derives unique one-time public key." },
          { title: "Confidential Amounts", description: "Values hidden in commitments with range proofs for non-negative amounts." },
          { title: "One-of-Many Proofs", description: "STARK-based proof of membership in anonymity set with linkability tags." },
          { title: "View Keys", description: "Optional tokens for specific parties to scan outputs to subaddresses." }
        ],
        codeTitle: "Transaction Structure (Conceptual)",
        code: `TX {
  version: 1,
  inputs: [
    {
      prev_txid: 0x..., // 32B
      prev_index: uint32,
      ann_link_tag: 32B,
      one_of_many_proof: <STARKblob>,
      pq_signature: { alg_tag: 0x01, sig_blob: ... }
    }
  ],
  outputs: [
    {
      stealth_blob: <ephemeral_pubkey + nonce>,
      value_commitment: 32B,
      output_meta: { deposit_flag: bool, deposit_id: optional 32B }
    }
  ],
  witness: {
    range_proofs: [<STARKblob>],
    stamp: timestamp,
    extra: ...
  },
  locktime: uint32
}`
      },
      spendFlow: {
        title: "6. One-of-Many Spend Flow (Plain English)",
        intro: "When a wallet wants to spend a UTXO privately:",
        steps: [
          "The wallet selects a <strong>decoy set</strong> of existing outputs (the \"anonymity set\")",
          "The wallet produces a <strong>STARK proof</strong> that <em>one</em> of those outputs is truly owned",
          "The proof does <strong>not reveal which one</strong>, but produces a <strong>spend tag</strong>",
          "If the same UTXO were spent twice, the tags match and double-spend is detectable",
          "Miner/validator verifies the STARK proof and the spend is accepted"
        ],
        cardText: "<strong>Conceptually:</strong> This is like Monero ring signatures but implemented with STARK-based circuits and post-quantum signatures."
      },
      walletUx: {
        title: "7. Wallet UX & Compliance Modes",
        blocks: [
          {
            heading: "Default UX",
            paragraphs: [
              "All peer-to-peer payments default to private mode (stealth addresses + confidential amounts). Simple UI: <strong>\"Send privately\"</strong>."
            ]
          },
          {
            heading: "Exchange Deposit Mode",
            paragraphs: [
              "When sending to an exchange, the wallet offers <strong>\"Deposit (exchange mode)\"</strong>:"
            ],
            list: [
              "Exchange generates a <strong>deposit subaddress</strong> tied to a KYC account",
              "Wallet sends funds to that subaddress with exchange view token",
              "Public chain shows stealth output, but exchange can reconcile deposits",
              "For suspicious deposits, wallet can generate <strong>audit packet</strong> per user consent"
            ]
          },
          {
            heading: "One-click Auditor Disclosure",
            paragraphs: [
              "Wallet UX presents plainly what is disclosed when the user creates an audit packet, maintaining transparency about privacy trade-offs."
            ]
          }
        ]
      },
      roadmap: {
        title: "8. Roadmap & MVP",
        phases: [
          { title: "Phase 0 (0-3 months)", description: "Foundation, legal, core team; research; primitive choices; skeleton repo" },
          { title: "Phase 1 (3-9 months)", description: "Core L1 node: UTXO, Dilithium signatures, basic PoW, stealth outputs; testnet" },
          { title: "Phase 2 (9-18 months)", description: "Add STARK privacy; wallet client; exchange SDK; comprehensive audits" },
          { title: "Phase 3 (18-30 months)", description: "Utreexo support; light clients; L2 rollup prototype; ecosystem grants" }
        ],
        postLaunchHeading: "Post-Launch Goals",
        postLaunchParagraph: "Iterative upgrades (crypto-agility), hardware wallet integration, multi-jurisdictional expansion, and continued research partnerships."
      },
      conclusion: {
        title: "9. Conclusion",
        paragraphs: [
          "PQ-PRIV aims to prove that <strong>privacy and legal compliance are not mutually exclusive</strong> and that post-quantum safety can be engineered as a first-class property of a ledger. The design leverages modern STARKs, lattice signatures and prudent governance to deliver a practical, implementable chain that protects user privacy while offering real rails for exchanges and institutions.",
          "The engineering challenge is substantial — but the path is clear: <strong>layered rollout, heavy auditing, and a disciplined governance model</strong>."
        ],
        cardText: "Building the future of private, post-quantum secure digital money"
      }
    },
    infoBanner: "This whitepaper is shared for study and review. All communication channels will open once the protocol enters the community preview stage.",
    footer: {
      line1: "Post-quantum privacy chain research initiative. Whitepaper draft v0.9 • Updated 2025-10-03",
      line2: "© ${new Date().getFullYear()} PQ-PRIV Research Collective. Distributed for research and educational purposes only."
    },
    tableOfContents: {
      sections: [
        { id: "overview", title: "Overview", level: 1 },
        { id: "motivation", title: "Motivation & Goals", level: 1 },
        { id: "threat-model", title: "Threat Model", level: 1 },
        { id: "architecture", title: "Architecture", level: 1 },
        { id: "cryptography", title: "Cryptographic Choices", level: 1 },
        { id: "transaction-model", title: "Transaction Model", level: 1 },
        { id: "spend-flow", title: "One-of-Many Spend Flow", level: 1 },
        { id: "wallet-ux", title: "Wallet UX & Compliance Modes", level: 1 },
        { id: "roadmap", title: "Roadmap & MVP", level: 1 },
        { id: "conclusion", title: "Conclusion", level: 1 }
      ],
      labels: {
        panelTitle: "Navigate",
        panelSubtitle: "Quick jump to any section or keep typing to filter.",
        searchPlaceholder: "Search sections…",
        progress: "Reading progress",
        triggerLabel: "Contents",
        triggerHint: "Open",
        sheetTitle: "Navigate",
        sheetDescription: "Browse the whitepaper by section or search for a topic.",
        now: "Now",
        noMatches: "No matches found.",
        mobileAriaLabel: "Open table of contents"
      }
    },
    scrollToTop: "Scroll back to top",
    themeToggle: {
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme"
    },
    languageSelector: { label: "Language" }
  },
  cs: {
    header: {
      projectTagline: "PQ-PRIV",
      projectTitle: "Postkvantová soukromá L1",
      navLinks: [
        { id: "overview", title: "Přehled" },
        { id: "architecture", title: "Architektura" },
        { id: "transaction-model", title: "Transakce" },
        { id: "wallet-ux", title: "Peněženka UX" },
        { id: "roadmap", title: "Roadmapa" }
      ],
      roadmapCta: "Roadmapa"
    },
    hero: {
      badge: "Verze 0.9 · aktualizováno říjen 2025",
      title: "Postkvantový soukromý řetězec navržený pro reálné nasazení",
      description: "PQ-PRIV kombinuje mřížkové podpisy, soukromí podložené STARKy a promyšlené compliance toky, aby odemkl novou třídu digitálních peněz – výchozím nastavením soukromých, na vyžádání auditovatelných a odolných vůči kvantovým otřesům.",
      ctas: {
        primary: { label: "Přejít na cíle", target: "motivation" },
        secondary: { label: "Transakční model", target: "transaction-model" },
        tertiary: { label: "Sekce UX peněženky", target: "wallet-ux" }
      },
      stats: [
        { value: "3", label: "Postkvantová primitiva", description: "Dilithium, SPHINCS+, STARK závazky" },
        { value: "150+", label: "Cíl soukromého průtoku", description: "Stíněné tx/s s podporou rollupů" },
        { value: "< 30 s", label: "Selektivní zveřejnění", description: "Průměrná doba vytvoření auditního balíčku" }
      ],
      metaBadges: [
        "Datum · 2025-10-03",
        "Autoři · Projektový tým (pseudonymní)",
        "Vydání · Výzkumný whitepaper"
      ],
      tldr: {
        title: "Stručně",
        paragraphs: [
          "PQ-PRIV je nová vrstva 1, která spojuje tři neoddiskutovatelné záruky: postkvantovou bezpečnost, výchozí soukromí a provozní pragmatismus. Architektura vyvažuje silnou kryptografii s praktickým výkonem uzlů, takže protokol může škálovat bez kompromisů v oblasti compliance."
        ],
        bullets: [
          "<strong>Postkvantově především:</strong> Podpisy Dilithium se záložním SPHINCS+ pro kryptografickou obratnost.",
          "<strong>Soukromí bez zastírání:</strong> Stealth výstupy, důvěrné částky a STARK důkazy tvoří výchozí platební cestu.",
          "<strong>Compliance za vašich podmínek:</strong> Selektivní zveřejnění, depozitní subadresy a auditní balíčky sedí regulatorním workflow."
        ]
      }
    },
    highlights: [
      {
        title: "Toky s důrazem na peněženku",
        description: "Srozumitelné texty, chytré defaulty a kontextová edukace udržují soukromé platby bez námahy."
      },
      {
        title: "Jasná práce operátorů",
        description: "Compliance obrazovky mění selektivní zveřejnění ve vedený průvodce s exporty připravenými pro politiku."
      },
      {
        title: "Pohodlí vývojářů",
        description: "Moderní SDK, deterministická API uzlů a STARK nástroje dělají integraci předvídatelnou."
      }
    ],
    keyConcepts: {
      security: {
        title: "Postkvantová bezpečnost",
        description: "Podpisy CRYSTALS-Dilithium a STARK důkazy zajišťují odolnost proti kvantovým útokům využívajícím Shorův algoritmus."
      },
      privacy: {
        title: "Silné soukromí",
        description: "Stealth adresy, důvěrné částky a one-of-many důkazy poskytují ve výchozím nastavení nepropojitelné transakce."
      },
      compliance: {
        title: "Regulatorní kompatibilita",
        description: "Mechanismy selektivního zveřejnění a workflow přívětivá burzám umožňují institucionální adopci bez zadních vrátek."
      }
    },
    divider: { deepDive: "Detailní rozbor whitepaperu" },
    sections: {
      motivation: {
        title: "1. Motivace a cíle",
        problemHeading: "Problém",
        problemParagraph: "Veřejné blockchainy jsou silné, ale čelí protichůdným potřebám: auditovatelnosti pro regulátory a instituce, robustnímu soukromí pro bezpečí a svobodu uživatelů a kryptografické odolnosti s postupujícím kvantovým vývojem. Stávající systémy obvykle dobře zvládnou nanejvýš dvě tyto oblasti. Privacy coiny často postrádají institucionální kompatibilitu; mainstreamové chainy zase nemají nativní soukromí; téměř všechny řetězce spoléhají na eliptické křivky zranitelné Shorovým algoritmem ve škálovatelném kvantovém počítači.",
        goalsHeading: "Cíle",
        goalsList: [
          "Nativní <strong>postkvantové podpisové schéma</strong> (primární) s konzervativní zálohou.",
          "Nativní <strong>soukromé primitivy</strong>, které ve výchozím stavu skrývají odesílatele/příjemce i částky.",
          "<strong>Selektivní zveřejnění</strong>, které umožní uživateli doložit původ kryptografickým důkazem.",
          "<strong>Provozní pragmatismus</strong>: rozumné velikosti transakcí a náklady na verifikaci.",
          "<strong>Správa a transparentnost</strong> bránící autoritářským zámkům nebo tajným klíčům."
        ]
      },
      threatModel: {
        title: "2. Hrozbový model",
        introHeading: "Zohlednění protivníků",
        cards: [
          { title: "Kvantový protivník", description: "Schopný v budoucnu spouštět Shorův/Groverův algoritmus" },
          { title: "Forenzní analytik", description: "Snaží se deanonymizovat uživatele chainovou analýzou" },
          { title: "Zlovolní zasvěcenci", description: "Jednotlivci či malé skupiny pokoušející se zneužít privilegované klíče" },
          { title: "Regulační nátlak", description: "Žádosti o zveřejnění, soudní příkazy, příkazy k mlčenlivosti" }
        ],
        note: "<strong>Poznámka:</strong> Design výslovně neslouží k obcházení legitimního vyšetřování, ale snižuje atraktivitu pro zločince díky compliant on/off rampám a uživatelsky řízenému zveřejňování."
      },
      architecture: {
        title: "3. Architektura na vysoké úrovni",
        bullets: [
          { text: "<strong>UTXO model vrstvy 1</strong> s výchozím soukromím (stealth výstupy + důvěrné částky)" },
          { text: "<strong>Konsensus:</strong> Konfigurovatelné PoW pro start nebo hybridní PoW/PoS" },
          {
            text: "<strong>Krypto stack:</strong> Multi-algoritmický (krypto agilní) přístup:",
            items: [
              "<em>Primární podpis:</em> CRYSTALS-Dilithium (mřížkový)",
              "<em>Záložní podpis:</em> SPHINCS+ (hashový)",
              "<em>Prvky ZK:</em> STARK důkazy",
              "<em>Hashovací rodina:</em> SHA-2/SHA-3 a BLAKE3"
            ]
          },
          { text: "<strong>Soukromé primitivy:</strong> Stealth adresy, důvěrné závazky, STARK one-of-many důkazy" },
          { text: "<strong>Lehké klienty:</strong> Utreexo závazky a stručné důkazy" },
          { text: "<strong>Compliance primitivy:</strong> Depozitní subadresy + selektivní ZK zveřejnění" }
        ]
      },
      cryptography: {
        title: "4. Kryptografické volby a odůvodnění",
        sections: [
          {
            heading: "Primární podpis: CRYSTALS-Dilithium",
            paragraph: "<strong>Výhody:</strong> Rodina schválená NISTem, rozumné velikosti podpisů (~1–3 kB), rychlé generování klíčů/podepisování/ověřování. Dobrá volba pro L1."
          },
          {
            heading: "Záložní podpis: SPHINCS+",
            paragraph: "<strong>Výhody:</strong> Hashová, konzervativní varianta s většími podpisy (desítky kB), ale odolností vůči neočekávaným kvantovým průlomům; používá se jako pohotovostní varianta."
          },
          {
            heading: "Znalosti bez odhalení: STARKs",
            paragraph: "<strong>Výhody:</strong> Transparentní (bez trusted setupu) a hashová primitiva odolná proti kvantovým útokům. STARKy se používají pro:",
            list: [
              "<strong>Důkazy rozsahu</strong> (důvěrné částky)",
              "<strong>Důkazy typu one-of-many</strong> (důkaz vlastnictví jednoho výstupu v množině)",
              "<strong>Kompaktní důkazy pro lehké klienty</strong> (ověření predikátů bez celé chain historIe)"
            ]
          }
        ],
        agilityCard: {
          title: "Kryptoagilita",
          paragraph: "Protokol obsahuje verzovací systém pro podpisová a důkazní primitiva. Bloky a transakční svědectví nesou značky verze algoritmu. Nová primitiva lze zavést jako upgrade bez zneplatnění starých výstupů."
        }
      },
      transactionModel: {
        title: "5. Transakční model (UTXO, prvky soukromí)",
        overviewHeading: "Přehled",
        overviewIntro: "Výstupy UTXO nesou:",
        overviewBullets: [
          "Jednorázovou stealth derivaci cíle (nepropojitelnou s příjemcem)",
          "Závazek k hodnotě (důvěrný)",
          "Malý veřejný tag pro volitelný audit nebo párování depozitů na burze"
        ],
        primitivesHeading: "Soukromé prvky v transakci",
        primitives: [
          { title: "Stealth adresy", description: "Příjemce zveřejní skenovací/spend klíče. Odesílatel odvodí unikátní jednorázový veřejný klíč." },
          { title: "Důvěrné částky", description: "Hodnoty skryté v závazcích s důkazy rozsahu pro nezáporné částky." },
          { title: "Důkazy one-of-many", description: "STARK důkaz členství v anonymní množině se značkami pro detekci dvojí útraty." },
          { title: "Prohlížecí klíče", description: "Volitelné tokeny pro konkrétní strany k procházení výstupů na subadresy." }
        ],
        codeTitle: "Struktura transakce (koncept)",
        code: `TX {
  version: 1,
  inputs: [
    {
      prev_txid: 0x..., // 32 B
      prev_index: uint32,
      ann_link_tag: 32 B,
      one_of_many_proof: <STARKblob>,
      pq_signature: { alg_tag: 0x01, sig_blob: ... }
    }
  ],
  outputs: [
    {
      stealth_blob: <ephemeral_pubkey + nonce>,
      value_commitment: 32 B,
      output_meta: { deposit_flag: bool, deposit_id: optional 32 B }
    }
  ],
  witness: {
    range_proofs: [<STARKblob>],
    stamp: timestamp,
    extra: ...
  },
  locktime: uint32
}`
      },
      spendFlow: {
        title: "6. One-of-many proces útraty (lidově)",
        intro: "Když chce peněženka utratit UTXO soukromě:",
        steps: [
          "Peněženka zvolí <strong>klamnou množinu</strong> existujících výstupů (\"anonymní množina\")",
          "Peněženka vytvoří <strong>STARK důkaz</strong>, že <em>jeden</em> z výstupů opravdu vlastní",
          "Důkaz <strong>neprozradí který</strong>, ale vytvoří <strong>značku útraty</strong>",
          "Pokud by stejné UTXO bylo utraceno dvakrát, značky se shodují a dvojí útrata je dohledatelná",
          "Autor bloku/validator ověří STARK důkaz a útrata je přijata"
        ],
        cardText: "<strong>Konceptuálně:</strong> Je to podobné Monero ring podpisům, ale implementované pomocí STARK obvodů a postkvantových podpisů."
      },
      walletUx: {
        title: "7. UX peněženky a režimy compliance",
        blocks: [
          {
            heading: "Výchozí UX",
            paragraphs: [
              "Všechny P2P platby jsou ve výchozím nastavení soukromé (stealth adresy + důvěrné částky). Jednoduché UI: <strong>„Poslat soukromě“</strong>."
            ]
          },
          {
            heading: "Depozitní režim pro burzy",
            paragraphs: [
              "Při odesílání na burzu peněženka nabídne <strong>„Depozit (burzovní režim)“</strong>:"
            ],
            list: [
              "Burza vygeneruje <strong>depozitní subadresu</strong> navázanou na KYC účet",
              "Peněženka odešle prostředky na tuto subadresu spolu s prohlížecím tokenem",
              "Veřejný řetězec ukazuje stealth výstup, ale burza dokáže depozity spárovat",
              "U podezřelých depozitů může peněženka na základě souhlasu uživatele vytvořit <strong>auditní balíček</strong>"
            ]
          },
          {
            heading: "Jedním klikem pro auditora",
            paragraphs: [
              "UX peněženky jasně ukáže, co se odhalí při vytvoření auditního balíčku, a drží tak transparentnost ohledně kompromisů soukromí."
            ]
          }
        ]
      },
      roadmap: {
        title: "8. Roadmapa a MVP",
        phases: [
          { title: "Fáze 0 (0–3 měsíce)", description: "Základy, právní rámec, core tým; výzkum; volba primitiv; skelet repozitáře" },
          { title: "Fáze 1 (3–9 měsíců)", description: "Core L1 uzel: UTXO, podpisy Dilithium, základní PoW, stealth výstupy; testnet" },
          { title: "Fáze 2 (9–18 měsíců)", description: "Přidat STARK soukromí; klient peněženky; SDK pro burzy; komplexní audity" },
          { title: "Fáze 3 (18–30 měsíců)", description: "Podpora Utreexo; lehcí klienti; prototyp L2 rollupu; granty pro ekosystém" }
        ],
        postLaunchHeading: "Cíle po spuštění",
        postLaunchParagraph: "Iterativní upgrady (kryptoagilita), integrace hardwarových peněženek, expanze do vícero jurisdikcí a pokračující výzkumná partnerství."
      },
      conclusion: {
        title: "9. Závěr",
        paragraphs: [
          "PQ-PRIV chce dokázat, že <strong>soukromí a právní shoda se nevylučují</strong> a že postkvantovou bezpečnost lze navrhnout jako vlastnost první třídy. Design využívá moderní STARKy, mřížkové podpisy a uvážlivé řízení k dodání praktického řetězce, který chrání soukromí uživatelů a současně nabízí reálné koleje pro burzy a instituce.",
          "Inženýrská výzva je významná — ale cesta je jasná: <strong>postupné nasazování, důkladné audity a disciplinovaný model správy</strong>."
        ],
        cardText: "Budujeme budoucnost soukromých, postkvantově bezpečných digitálních peněz"
      }
    },
    infoBanner: "Tento whitepaper sdílíme ke studiu a připomínkám. Veškeré komunikační kanály otevřeme až ve chvíli, kdy protokol vstoupí do komunitního náhledu.",
    footer: {
      line1: "Výzkumná iniciativa postkvantového soukromého řetězce. Whitepaper verze 0.9 • Aktualizováno 2025-10-03",
      line2: "© ${new Date().getFullYear()} PQ-PRIV Research Collective. Šířeno pouze pro výzkumné a vzdělávací účely."
    },
    tableOfContents: {
      sections: [
        { id: "overview", title: "Přehled", level: 1 },
        { id: "motivation", title: "Motivace a cíle", level: 1 },
        { id: "threat-model", title: "Hrozbový model", level: 1 },
        { id: "architecture", title: "Architektura", level: 1 },
        { id: "cryptography", title: "Kryptografické volby", level: 1 },
        { id: "transaction-model", title: "Transakční model", level: 1 },
        { id: "spend-flow", title: "Proces útraty one-of-many", level: 1 },
        { id: "wallet-ux", title: "UX peněženky a shoda", level: 1 },
        { id: "roadmap", title: "Roadmapa a MVP", level: 1 },
        { id: "conclusion", title: "Závěr", level: 1 }
      ],
      labels: {
        panelTitle: "Navigace",
        panelSubtitle: "Rychle přejděte na libovolnou sekci nebo pište pro filtrování.",
        searchPlaceholder: "Hledat sekce…",
        progress: "Průběh čtení",
        triggerLabel: "Obsah",
        triggerHint: "Otevřít",
        sheetTitle: "Navigace",
        sheetDescription: "Procházejte whitepaper podle sekcí nebo vyhledejte téma.",
        now: "Nyní",
        noMatches: "Žádné výsledky.",
        mobileAriaLabel: "Otevřít obsah dokumentu"
      }
    },
    scrollToTop: "Zpět nahoru",
    themeToggle: {
      toLight: "Přepnout na světlý režim",
      toDark: "Přepnout na tmavý režim"
    },
    languageSelector: { label: "Jazyk" }
  },
  de: {
    header: {
      projectTagline: "PQ-PRIV",
      projectTitle: "Post-Quanten-Privacy L1",
      navLinks: [
        { id: "overview", title: "Überblick" },
        { id: "architecture", title: "Architektur" },
        { id: "transaction-model", title: "Transaktionen" },
        { id: "wallet-ux", title: "Wallet-UX" },
        { id: "roadmap", title: "Roadmap" }
      ],
      roadmapCta: "Roadmap"
    },
    hero: {
      badge: "Version 0.9 Entwurf · Aktualisiert Okt 2025",
      title: "Die Post-Quanten-Privacy-Chain für den Praxiseinsatz",
      description: "PQ-PRIV kombiniert Gitter-Signaturen, STARK-gestützte Privatsphäre und gezielte Compliance-Flows, um eine neue Klasse digitaler Gelder zu ermöglichen – standardmäßig privat, bei Bedarf auditierbar und gegen Quantenschocks gewappnet.",
      ctas: {
        primary: { label: "Zu den Zielen springen", target: "motivation" },
        secondary: { label: "Transaktionsmodell", target: "transaction-model" },
        tertiary: { label: "Wallet-UX Abschnitt", target: "wallet-ux" }
      },
      stats: [
        { value: "3", label: "Quantenresistente Primitiven", description: "Dilithium, SPHINCS+, STARK-Verpflichtungen" },
        { value: "150+", label: "Ziel für private Durchsätze", description: "Abgeschirmte Tx/s mit Rollup-Unterstützung" },
        { value: "< 30 s", label: "Selektive Offenlegungen", description: "Durchschnittliche Erstellung eines Audit-Pakets" }
      ],
      metaBadges: [
        "Datum · 2025-10-03",
        "Autoren · Projektteam (pseudonym)",
        "Veröffentlichung · Forschungs-Whitepaper"
      ],
      tldr: {
        title: "Kurzfassung",
        paragraphs: [
          "PQ-PRIV ist eine neue Layer-1, die drei unverzichtbare Garantien bündelt: Post-Quanten-Sicherheit, standardmäßige Privatsphäre und operativen Pragmatismus. Die Architektur balanciert starke Kryptografie mit praktischer Node-Performance, damit das Protokoll skalieren kann, ohne Compliance-Hooks aufzugeben."
        ],
        bullets: [
          "<strong>Post-Quanten zuerst:</strong> Dilithium-Signaturen mit SPHINCS+-Fallback für kryptografische Agilität.",
          "<strong>Privatsphäre ohne Blindflug:</strong> Stealth-Ausgaben, vertrauliche Beträge und STARK-Beweise bilden den Standardpfad.",
          "<strong>Compliance nach Bedarf:</strong> Selektive Offenlegung, Deposit-Subadressen und Audit-Pakete passen in regulatorische Workflows."
        ]
      }
    },
    highlights: [
      {
        title: "Wallet-zentrierte Abläufe",
        description: "Benutzerfreundliche Texte, clevere Defaults und kontextuelle Aufklärung halten private Zahlungen mühelos."
      },
      {
        title: "Klarheit für Betreiber",
        description: "Compliance-Oberflächen verwandeln selektive Offenlegung in einen geführten Assistenten mit exportierbaren Policies."
      },
      {
        title: "Ergonomie für Entwickler",
        description: "Moderne SDKs, deterministische Node-APIs und STARK-Tooling machen Integration berechenbar."
      }
    ],
    keyConcepts: {
      security: {
        title: "Post-Quanten-Sicherheit",
        description: "CRYSTALS-Dilithium-Signaturen und STARK-Beweise sichern gegen Quantenangriffe nach Shor."
      },
      privacy: {
        title: "Starke Privatsphäre",
        description: "Stealth-Adressen, vertrauliche Beträge und One-of-Many-Beweise liefern standardmäßig nicht verknüpfbare Transaktionen."
      },
      compliance: {
        title: "Regulatorische Konformität",
        description: "Mechanismen zur selektiven Offenlegung und börsenfreundliche Abläufe ermöglichen institutionelle Adoption ohne Hintertüren."
      }
    },
    divider: { deepDive: "Whitepaper-Deep-Dive" },
    sections: {
      motivation: {
        title: "1. Motivation & Ziele",
        problemHeading: "Problem",
        problemParagraph: "Öffentliche Blockchains sind mächtig, stehen aber im Spannungsfeld zwischen Prüfbarkeit für Aufsichtsbehörden, robuster Privatsphäre für Nutzende und kryptografischer Resilienz gegenüber künftigen Quantenrechnern. Bestehende Systeme erfüllen höchstens zwei dieser Anforderungen gut. Privacy-Coins sind häufig nicht institutionsfähig; Mainstream-Chains haben keine native Privatsphäre; nahezu alle basieren auf ECC-Primitiven, die Shor-angreifbar sind, sobald universelle Quantenrechner verfügbar sind.",
        goalsHeading: "Ziele",
        goalsList: [
          "Ein natives <strong>post-quanten Signaturverfahren</strong> mit konservativer Fallback-Option.",
          "Native <strong>Privacy-Primitiven</strong>, die Sender, Empfänger und Beträge standardmäßig verbergen.",
          "<strong>Selektive Offenlegung</strong>, damit Nutzende kryptografisch Herkunft belegen können.",
          "<strong>Operativer Pragmatismus</strong>: praktikable Transaktionsgrößen und vertretbare Verifikationskosten.",
          "<strong>Governance & Transparenz</strong> gegen autoritäres Einsperren oder geheime Schlüssel."
        ]
      },
      threatModel: {
        title: "2. Bedrohungsmodell",
        introHeading: "Berücksichtigte Gegner",
        cards: [
          { title: "Quanten-Gegner", description: "Kann künftig Shor-/Grover-Algorithmen ausführen" },
          { title: "Forensischer Analyst", description: "Versucht per Chain-Analyse Nutzer zu deanonymisieren" },
          { title: "Böswillige Insider", description: "Individuen oder kleine Gruppen, die privilegierte Schlüssel missbrauchen wollen" },
          { title: "Regulatorischer Druck", description: "Offenlegungsersuchen, Durchsuchungsbefehle, Schweigeverfügungen" }
        ],
        note: "<strong>Hinweis:</strong> Ziel ist nicht, rechtmäßige Ermittlungen zu umgehen, sondern kriminelle Attraktivität durch konforme On-/Off-Ramps und nutzerkontrollierte Offenlegung zu reduzieren."
      },
      architecture: {
        title: "3. Architektur auf hoher Ebene",
        bullets: [
          { text: "<strong>Layer-1-UTXO-Modell</strong> mit standardmäßiger Privatsphäre (Stealth-Ausgaben + vertrauliche Beträge)" },
          { text: "<strong>Konsens:</strong> Konfigurierbares PoW zum Launch oder hybrides PoW/PoS" },
          {
            text: "<strong>Krypto-Stack:</strong> Multialgorithmischer (agiler) Ansatz:",
            items: [
              "<em>Primäre Signatur:</em> CRYSTALS-Dilithium (gitterbasiert)",
              "<em>Fallback-Signatur:</em> SPHINCS+ (hashbasiert)",
              "<em>Zero-Knowledge-Primitiven:</em> STARK-Beweise",
              "<em>Hash-Familie:</em> SHA-2/SHA-3 und BLAKE3"
            ]
          },
          { text: "<strong>Privacy-Primitiven:</strong> Stealth-Adressen, vertrauliche Commitments, STARK-One-of-Many" },
          { text: "<strong>Light Clients:</strong> Utreexo-Commitments und kompakte Beweise" },
          { text: "<strong>Compliance-Primitiven:</strong> Deposit-Subadressen + selektive ZK-Offenlegung" }
        ]
      },
      cryptography: {
        title: "4. Kryptografische Entscheidungen & Begründung",
        sections: [
          {
            heading: "Primäre Signatur: CRYSTALS-Dilithium",
            paragraph: "<strong>Vorteile:</strong> NIST-konforme Familie, vernünftige Signaturgrößen (~1–3 kB), schnelles Keygen/Sign/Verify. Gute Wahl für L1."
          },
          {
            heading: "Fallback-Signatur: SPHINCS+",
            paragraph: "<strong>Vorteile:</strong> Hashbasiert, konservativ, größere Signaturen (Zehner-kB), aber robust gegen unerwartete Quantensprünge; dient als Notfalloption."
          },
          {
            heading: "Zero-Knowledge: STARKs",
            paragraph: "<strong>Vorteile:</strong> Transparent (kein Trusted Setup) und hashbasierte Primitiven, widerstandsfähig gegen Quantenangriffe. STARKs eignen sich für:",
            list: [
              "<strong>Range Proofs</strong> (vertrauliche Beträge)",
              "<strong>One-of-Many</strong>-Beweise (Eigentum an einem Output in einer Menge)",
              "<strong>Kompakte Light-Client-Beweise</strong> (Kettenprädikate ohne gesamte Historie prüfen)"
            ]
          }
        ],
        agilityCard: {
          title: "Krypto-Agilität",
          paragraph: "Der Protokollkern enthält ein Versionssystem für Signatur- und Beweisprimitiven. Blöcke und Zeugen tragen Algorithmus-Versionen. Neue Primitiven lassen sich als Upgrade einführen, ohne alte Outputs zu brechen."
        }
      },
      transactionModel: {
        title: "5. Transaktionsmodell (UTXO, Privacy-Funktionen)",
        overviewHeading: "Überblick",
        overviewIntro: "UTXO-Ausgänge enthalten:",
        overviewBullets: [
          "Eine einmalige Stealth-Zielableitung (nicht dem Empfänger zuordenbar)",
          "Ein Commitment auf den Wert (vertraulich)",
          "Einen kleinen öffentlichen Tag für optionales Auditing oder Börsen-Deposits"
        ],
        primitivesHeading: "Privacy-Primitiven in einer Transaktion",
        primitives: [
          { title: "Stealth-Adressen", description: "Empfänger veröffentlicht Scan-/Spend-Keys. Sender leitet einen einmaligen Public Key ab." },
          { title: "Vertrauliche Beträge", description: "Werte sind in Commitments mit Range Proofs für Nichtnegativität verborgen." },
          { title: "One-of-Many-Beweise", description: "STARK-basierter Mitgliedschaftsnachweis mit Linkability-Tags." },
          { title: "View Keys", description: "Optionale Token für bestimmte Parteien zum Scannen von Outputs an Subadressen." }
        ],
        codeTitle: "Transaktionsstruktur (konzeptionell)",
        code: `TX {
  version: 1,
  inputs: [
    {
      prev_txid: 0x..., // 32 B
      prev_index: uint32,
      ann_link_tag: 32 B,
      one_of_many_proof: <STARKblob>,
      pq_signature: { alg_tag: 0x01, sig_blob: ... }
    }
  ],
  outputs: [
    {
      stealth_blob: <ephemeral_pubkey + nonce>,
      value_commitment: 32 B,
      output_meta: { deposit_flag: bool, deposit_id: optional 32 B }
    }
  ],
  witness: {
    range_proofs: [<STARKblob>],
    stamp: timestamp,
    extra: ...
  },
  locktime: uint32
}`
      },
      spendFlow: {
        title: "6. One-of-Many-Ausgabefluss (einfach erklärt)",
        intro: "Wenn eine Wallet ein UTXO privat ausgeben möchte:",
        steps: [
          "Die Wallet wählt einen <strong>Köder-Pool</strong> bestehender Outputs (\"Anonymitätsmenge\")",
          "Sie erzeugt einen <strong>STARK-Beweis</strong>, dass <em>einer</em> dieser Outputs wirklich ihr gehört",
          "Der Beweis <strong>verrät nicht welchen</strong>, erzeugt aber einen <strong>Spending Tag</strong>",
          "Wird dasselbe UTXO doppelt ausgegeben, stimmen die Tags überein und Double-Spend wird sichtbar",
          "Miner/Validator prüft den STARK-Beweis und akzeptiert die Ausgabe"
        ],
        cardText: "<strong>Gedanklich:</strong> Ähnlich wie Monero-Ringsignaturen, jedoch mit STARK-Schaltungen und Post-Quanten-Signaturen umgesetzt."
      },
      walletUx: {
        title: "7. Wallet-UX & Compliance-Modi",
        blocks: [
          {
            heading: "Standard-UX",
            paragraphs: [
              "Alle Peer-to-Peer-Zahlungen sind standardmäßig privat (Stealth-Adressen + vertrauliche Beträge). Simple UI: <strong>„Privat senden“</strong>."
            ]
          },
          {
            heading: "Börsen-Deposit-Modus",
            paragraphs: [
              "Beim Senden an eine Börse bietet die Wallet <strong>„Deposit (Exchange-Modus)“</strong> an:"
            ],
            list: [
              "Börse erzeugt eine <strong>Deposit-Subadresse</strong>, die an ein KYC-Konto gebunden ist",
              "Wallet sendet an diese Subadresse inklusive View Token",
              "On-Chain erscheint ein Stealth-Output, die Börse kann Deposits dennoch zuordnen",
              "Bei Auffälligkeiten kann die Wallet mit Zustimmung des Nutzers ein <strong>Audit-Paket</strong> erzeugen"
            ]
          },
          {
            heading: "Auditor-Offenlegung mit einem Klick",
            paragraphs: [
              "Die Wallet-UX zeigt klar, was bei Erstellung eines Audit-Pakets offengelegt wird, und macht Privacy-Trade-offs transparent."
            ]
          }
        ]
      },
      roadmap: {
        title: "8. Roadmap & MVP",
        phases: [
          { title: "Phase 0 (0–3 Monate)", description: "Fundament, Legal, Kernteam; Recherche; Auswahl der Primitiven; Skeleton-Repo" },
          { title: "Phase 1 (3–9 Monate)", description: "Core-L1-Node: UTXO, Dilithium-Signaturen, Basis-PoW, Stealth-Outputs; Testnet" },
          { title: "Phase 2 (9–18 Monate)", description: "STARK-Privatsphäre ergänzen; Wallet-Client; Exchange-SDK; umfassende Audits" },
          { title: "Phase 3 (18–30 Monate)", description: "Utreexo-Support; Light Clients; L2-Rollup-Prototyp; Ökosystem-Grants" }
        ],
        postLaunchHeading: "Ziele nach dem Launch",
        postLaunchParagraph: "Iterative Upgrades (Krypto-Agilität), Hardware-Wallet-Integration, Mehrländer-Expansion und kontinuierliche Forschungspartnerschaften."
      },
      conclusion: {
        title: "9. Fazit",
        paragraphs: [
          "PQ-PRIV will beweisen, dass <strong>Privatsphäre und Rechtskonformität sich nicht ausschließen</strong> und Post-Quanten-Sicherheit als Kerneigenschaft einer Ledger-Architektur gestaltbar ist. Das Design nutzt moderne STARKs, Gitter-Signaturen und umsichtiges Governance, um eine praktikable Chain zu liefern, die Nutzer schützt und dennoch echte Gleise für Börsen und Institutionen bietet.",
          "Die technische Herausforderung ist groß – doch der Weg ist klar: <strong>schrittweises Rollout, gründliche Audits und ein diszipliniertes Governance-Modell</strong>."
        ],
        cardText: "Die Zukunft privater, post-quanten-sicherer digitaler Währungen gestalten"
      }
    },
    infoBanner: "Dieses Whitepaper steht für Studium und Review bereit. Alle Kommunikationskanäle öffnen wir, sobald das Protokoll in die Community-Vorschau geht.",
    footer: {
      line1: "Forschungsinitiative für eine post-quanten Private Chain. Whitepaper-Entwurf v0.9 • Aktualisiert 2025-10-03",
      line2: "© ${new Date().getFullYear()} PQ-PRIV Research Collective. Nur zu Forschungs- und Bildungszwecken verteilt."
    },
    tableOfContents: {
      sections: [
        { id: "overview", title: "Überblick", level: 1 },
        { id: "motivation", title: "Motivation & Ziele", level: 1 },
        { id: "threat-model", title: "Bedrohungsmodell", level: 1 },
        { id: "architecture", title: "Architektur", level: 1 },
        { id: "cryptography", title: "Kryptografische Entscheidungen", level: 1 },
        { id: "transaction-model", title: "Transaktionsmodell", level: 1 },
        { id: "spend-flow", title: "One-of-Many-Ausgabefluss", level: 1 },
        { id: "wallet-ux", title: "Wallet-UX & Compliance", level: 1 },
        { id: "roadmap", title: "Roadmap & MVP", level: 1 },
        { id: "conclusion", title: "Fazit", level: 1 }
      ],
      labels: {
        panelTitle: "Navigation",
        panelSubtitle: "Springe schnell zu einem Abschnitt oder filtere per Suche.",
        searchPlaceholder: "Abschnitte durchsuchen…",
        progress: "Lesefortschritt",
        triggerLabel: "Inhalt",
        triggerHint: "Öffnen",
        sheetTitle: "Navigation",
        sheetDescription: "Blättere durch das Whitepaper nach Abschnitt oder suche ein Thema.",
        now: "Jetzt",
        noMatches: "Keine Treffer.",
        mobileAriaLabel: "Inhaltsverzeichnis öffnen"
      }
    },
    scrollToTop: "Zurück nach oben scrollen",
    themeToggle: {
      toLight: "Zum hellen Modus wechseln",
      toDark: "Zum dunklen Modus wechseln"
    },
    languageSelector: { label: "Sprache" }
  }
}

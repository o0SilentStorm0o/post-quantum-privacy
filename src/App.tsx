import { Shield, Eye, Certificate, Cpu, Network, Lock } from "@phosphor-icons/react"
import { KeyConcept } from "@/components/KeyConcept"
import { TableOfContents } from "@/components/TableOfContents"
import { TechnicalSection } from "@/components/TechnicalSection"
import { CodeBlock } from "@/components/CodeBlock"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const sections = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "motivation", title: "Motivation & Goals", level: 1 },
  { id: "threat-model", title: "Threat Model", level: 1 },
  { id: "architecture", title: "Architecture", level: 1 },
  { id: "cryptography", title: "Cryptographic Choices", level: 1 },
  { id: "transaction-model", title: "Transaction Model", level: 1 },
  { id: "spend-flow", title: "One-of-Many Spend Flow", level: 1 },
  { id: "consensus", title: "Block & Consensus", level: 1 },
  { id: "network", title: "Network Layer", level: 1 },
  { id: "light-clients", title: "Light Clients", level: 1 },
  { id: "wallet-ux", title: "Wallet UX & Compliance", level: 1 },
  { id: "disclosure", title: "Selective Disclosure", level: 1 },
  { id: "governance", title: "Treasury & Governance", level: 1 },
  { id: "compliance", title: "Compliance & Exchange Integration", level: 1 },
  { id: "economics", title: "Economics & Tokenomics", level: 1 },
  { id: "security", title: "Security & Audits", level: 1 },
  { id: "roadmap", title: "Roadmap", level: 1 },
]

const transactionExample = `TX {
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

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PQ-PRIV</h1>
              <p className="text-xs text-muted-foreground">Post-Quantum Privacy Layer-1</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Badge variant="outline">Version 0.9 Draft</Badge>
            <Badge className="bg-accent text-accent-foreground">Whitepaper</Badge>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <TableOfContents sections={sections} />
          </aside>

          <main className="lg:col-span-3 order-1 lg:order-2 space-y-8">
            <section id="overview" className="section-marker space-y-6">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                  PQ-PRIV: A Post-Quantum, Privacy-First Layer-1
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A new layer-1 cryptocurrency designed from day one to deliver post-quantum cryptographic 
                  resilience, strong transaction privacy, and practical throughput for real adoption.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <Badge variant="outline">Version 0.9 Draft</Badge>
                  <Badge variant="outline">Date: 2025-10-03</Badge>
                  <Badge variant="outline">Authors: Project Team (pseudonymous)</Badge>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    TL;DR (Elevator Pitch)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed">
                    PQ-PRIV is a new layer-1 cryptocurrency designed from day one to deliver three core 
                    guarantees simultaneously: <strong>(1) post-quantum cryptographic resilience</strong> for 
                    signatures and verification, <strong>(2) strong transaction privacy</strong> comparable to 
                    best privacy coins (stealth addresses, unlinkability, confidential amounts), and{" "}
                    <strong>(3) practical throughput & UX</strong> for real adoption (compact blocks, light 
                    clients, L2 rollups). The design intentionally embeds selective, user-controlled disclosure 
                    mechanisms and exchange-friendly deposit workflows so institutions can meet AML obligations 
                    without destroying user privacy.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KeyConcept
                  title="Post-Quantum Security"
                  description="CRYSTALS-Dilithium signatures and STARK-based proofs ensure resistance to quantum attacks using Shor's algorithm."
                  icon={<Shield className="h-6 w-6 text-primary" />}
                  variant="security"
                />
                <KeyConcept
                  title="Strong Privacy"
                  description="Stealth addresses, confidential amounts, and one-of-many proofs provide unlinkable transactions by default."
                  icon={<Eye className="h-6 w-6 text-secondary" />}
                  variant="privacy"
                />
                <KeyConcept
                  title="Regulatory Compliance"
                  description="Selective disclosure mechanisms and exchange-friendly workflows enable institutional adoption without backdoors."
                  icon={<Certificate className="h-6 w-6 text-destructive" />}
                  variant="compliance"
                />
              </div>
            </section>

            <Separator />

            <TechnicalSection title="1. Motivation & Goals" defaultOpen={true}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-destructive">Problem</h3>
                <p>
                  Public blockchains are powerful but face competing needs: auditability for regulators and 
                  institutions; robust privacy for user safety and freedom; and cryptographic resilience as 
                  quantum computing advances. Existing systems address at most two of these well. Privacy coins 
                  often lack institutional compatibility; mainstream chains lack native privacy; nearly all 
                  chains rely on ECC primitives vulnerable to Shor's algorithm in a full-scale universal 
                  quantum computer.
                </p>

                <h3 className="text-lg font-semibold text-secondary">Goals</h3>
                <ul className="space-y-2">
                  <li>• Native <strong>post-quantum signature scheme</strong> (primary) with conservative fallback(s).</li>
                  <li>• Native <strong>privacy primitives</strong> that hide sender/recipient and amounts by default.</li>
                  <li>• <strong>Selective disclosure</strong> facilities that let a user provide cryptographic proof of provenance.</li>
                  <li>• <strong>Operational pragmatism</strong>: practical transaction sizes, reasonable verification costs.</li>
                  <li>• <strong>Governance & transparency</strong> preventing authoritarian locking or secret keys.</li>
                </ul>
              </div>
            </TechnicalSection>

            <TechnicalSection title="2. Threat Model">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Adversaries Considered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        Quantum Adversary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Able to run Shor's/Grover's algorithms in the future
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        Forensic Analyst
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Attempting chain analytics to deanonymize users
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Malicious Insiders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Single or small group attempting to misuse privileged keys
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Certificate className="h-4 w-4" />
                        Regulatory Coercion
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Requests for disclosure, warrants, gag orders
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  <strong>Note:</strong> We explicitly do not design to help evade lawful investigations, 
                  but rather reduce attractiveness to criminals through compliant on/off ramps and 
                  user-controlled disclosure mechanisms.
                </p>
              </div>
            </TechnicalSection>

            <TechnicalSection title="3. High-level Architecture">
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li><strong>Layer-1 UTXO model</strong> with privacy default (stealth outputs + confidential amounts)</li>
                  <li><strong>Consensus:</strong> Configurable PoW for launch or hybrid PoW/PoS</li>
                  <li><strong>Crypto stack:</strong> Multi-algorithm (crypto-agile) approach:
                    <ul className="ml-6 mt-2 space-y-1">
                      <li>• <em>Primary signature:</em> CRYSTALS-Dilithium (lattice-based)</li>
                      <li>• <em>Fallback signature:</em> SPHINCS+ (hash-based)</li>
                      <li>• <em>Zero-knowledge primitives:</em> STARK-style proofs</li>
                      <li>• <em>Hash family:</em> SHA-2/SHA-3 family and BLAKE3</li>
                    </ul>
                  </li>
                  <li><strong>Privacy primitives:</strong> Stealth addresses, confidential commitments, STARK-based one-of-many proofs</li>
                  <li><strong>Light clients:</strong> Utreexo accumulator commitments and succinct proofs</li>
                  <li><strong>Compliance primitives:</strong> Deposit-mode subaddresses + selective disclosure ZK proofs</li>
                </ul>
              </div>
            </TechnicalSection>

            <TechnicalSection title="4. Cryptographic Choices & Rationale">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Primary Signature: CRYSTALS-Dilithium</h3>
                  <p className="mb-2">
                    <strong>Advantages:</strong> NIST acceptance family, reasonable signature sizes (~1–3 kB), 
                    fast keygen/sign/verify. Good tradeoff for L1.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Fallback Signature: SPHINCS+</h3>
                  <p className="mb-2">
                    <strong>Advantages:</strong> Hash-based, conservative, large signatures (tens of kB) but 
                    resilience to unforeseen quantum advances; used as emergency fallback.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Zero-knowledge: STARKs</h3>
                  <p className="mb-2">
                    <strong>Advantages:</strong> Transparent (no trusted setup) and hash-based primitives 
                    resilient to quantum attacks. Use STARKs for:
                  </p>
                  <ul className="ml-6 space-y-1">
                    <li>• <strong>Range proofs</strong> (confidential amounts)</li>
                    <li>• <strong>One-of-many proofs</strong> (proving ownership of one output in a set)</li>
                    <li>• <strong>Succinct light-client proofs</strong> (verify chain predicate w/o full chain)</li>
                  </ul>
                </div>

                <Card className="bg-accent/5 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-base">Crypto-agility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      The protocol includes a versioning system for signature and proof primitives. 
                      Blocks and transaction witnesses include algorithm version tags. New primitives 
                      can be introduced as protocol upgrades without invalidating old outputs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title="5. Transaction Model (UTXO, Privacy Features)">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Overview</h3>
                  <p>UTXO outputs carry:</p>
                  <ul className="ml-6 space-y-1 mt-2">
                    <li>• A one-time stealth destination derivation (unlinkable to recipient)</li>
                    <li>• A commitment to value (confidential)</li>
                    <li>• A small public tag for optional auditing or exchange deposit association</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Privacy Primitives in a Transaction</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Stealth Addresses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          Recipient publishes scan/spend keys. Sender derives unique one-time public key.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Confidential Amounts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          Values hidden in commitments with range proofs for non-negative amounts.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">One-of-Many Proofs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          STARK-based proof of membership in anonymity set with linkability tags.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">View Keys</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          Optional tokens for specific parties to scan outputs to subaddresses.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <CodeBlock 
                  code={transactionExample}
                  language="rust"
                  title="Transaction Structure (Conceptual)"
                />
              </div>
            </TechnicalSection>

            <TechnicalSection title="6. One-of-Many Spend Flow (Plain English)">
              <div className="space-y-4">
                <p>When a wallet wants to spend a UTXO privately:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>The wallet selects a <strong>decoy set</strong> of existing outputs (the "anonymity set")</li>
                  <li>The wallet produces a <strong>STARK proof</strong> that <em>one</em> of those outputs is truly owned</li>
                  <li>The proof does <strong>not reveal which one</strong>, but produces a <strong>spend tag</strong></li>
                  <li>If the same UTXO were spent twice, the tags match and double-spend is detectable</li>
                  <li>Miner/validator verifies the STARK proof and the spend is accepted</li>
                </ol>
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="pt-4">
                    <p className="text-sm">
                      <strong>Conceptually:</strong> This is like Monero ring signatures but implemented with 
                      STARK-based circuits and post-quantum signatures.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title="10. Wallet UX & Compliance Modes">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Default UX</h3>
                  <p>
                    All peer-to-peer payments default to private mode (stealth addresses + confidential amounts). 
                    Simple UI: <strong>"Send privately"</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Exchange Deposit Mode</h3>
                  <p className="mb-3">When sending to an exchange, the wallet offers <strong>"Deposit (exchange mode)"</strong>:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Exchange generates a <strong>deposit subaddress</strong> tied to a KYC account</li>
                    <li>Wallet sends funds to that subaddress with exchange view token</li>
                    <li>Public chain shows stealth output, but exchange can reconcile deposits</li>
                    <li>For suspicious deposits, wallet can generate <strong>audit packet</strong> per user consent</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">One-click Auditor Disclosure</h3>
                  <p>
                    Wallet UX presents plainly what is disclosed when the user creates an audit packet, 
                    maintaining transparency about privacy trade-offs.
                  </p>
                </div>
              </div>
            </TechnicalSection>

            <TechnicalSection title="17. Roadmap & MVP">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Phase 0 (0-3 months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Foundation, legal, core team; research; primitive choices; skeleton repo
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-secondary/20 bg-secondary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Phase 1 (3-9 months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Core L1 node: UTXO, Dilithium signatures, basic PoW, stealth outputs; testnet
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-accent/20 bg-accent/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Phase 2 (9-18 months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Add STARK privacy; wallet client; exchange SDK; comprehensive audits
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Phase 3 (18-30 months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Utreexo support; light clients; L2 rollup prototype; ecosystem grants
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Post-Launch Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Iterative upgrades (crypto-agility), hardware wallet integration, 
                      multi-jurisdictional expansion, and continued research partnerships.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>

            <TechnicalSection title="21. Conclusion">
              <div className="space-y-4">
                <p>
                  PQ-PRIV aims to prove that <strong>privacy and legal compliance are not mutually exclusive</strong> and 
                  that post-quantum safety can be engineered as a first-class property of a ledger. The design 
                  leverages modern STARKs, lattice signatures and prudent governance to deliver a practical, 
                  implementable chain that protects user privacy while offering real rails for exchanges and institutions.
                </p>
                <p>
                  The engineering challenge is substantial — but the path is clear: <strong>layered rollout, 
                  heavy auditing, and a disciplined governance model</strong>.
                </p>
                <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-center font-medium">
                      Building the future of private, post-quantum secure digital money
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TechnicalSection>
          </main>
        </div>
      </div>

      <footer className="border-t border-border bg-muted/30 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            PQ-PRIV Whitepaper v0.9 Draft | Project Team (pseudonymous) | 2025-10-03
          </p>
          <p className="mt-2">
            This document is for research and educational purposes. All cryptographic implementations 
            require extensive auditing before production use.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
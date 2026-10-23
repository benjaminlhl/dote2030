# DOTE 2030 Operations Management — Detailed Notes (Lectures 4–5)

*CUHK Business School, Fall 2026, Instructor: Jiangze (Jay) Han*
*Page numbers (p.) are PDF pages of the solution versions: `Lecture4_Queueing_Analysis_I_sol.pdf` (L4) and `Lecture5_Queueing_Analysis_II_Sol.pdf` (L5).*

---

## Lecture 4: Queueing Analysis I

**Recap (p.2):** inventory builds when input temporarily exceeds capacity. A stable process needs enough long-run capacity. Little's Law: **I = R × T**.
**New question:** how can we predict waiting when arrivals and service times *vary*?

**Agenda:** (1) queueing systems, (2) variability in a process, (3) probability theory, (4) single-server queue analysis, (5) the OM triangle.

### 1. Queueing systems

Designing a queueing system means choosing two things (p.4):
- **Structure**: how queues, servers and matching pools connect.
- **Service policy**: who receives service (or a match, or a resource), and when.

These choices drive **waiting time, access to service and match quality**, and therefore the utility of each stakeholder. Customers care about time and service benefits. Providers and platforms care about revenue and operating costs.

#### Structures (p.5–6)
| # | Structure | Example |
|---|---|---|
| 1 | One queue, one server | ATM |
| 2 | Parallel servers: **one shared queue** or **separate queues** | Bank (one line, several tellers) vs. supermarket (one queue per till) |
| 3 | Serial and branching network | Airport: check-in → security → assigned gate |
| 4 | Flexible routing | Disneyland: guests choose rides and may revisit them |
| 5 | Two-sided matching | Uber: riders matched with drivers |
| 6 | One-sided matching | Online games: players matched to form a game |
| 7 | Resource allocation | Kidney allocation: donated kidneys go to patients on a waiting list |

#### Service policies (p.7–8)
Given a structure, a policy decides what to do:
| Decision | Options |
|---|---|
| **Selection / allocation**: who gets service? | Arrival order, or a priority score |
| **Routing**: which server handles a request? | Take turns, or send to the server with the least waiting work |
| **Matching / grouping**: who pairs up? | Uber: nearest driver for each rider, or choose rider–driver pairs jointly |
| **Timing**: when does the system act? | Match immediately, or collect requests briefly before matching |

With one server, the question is **who goes next?**
- **First come, first served (FCFS)**: the earliest arrival goes next.
- **Shortest processing time first (SPT)**: the shortest job goes next.
- **Priority-based**: higher-priority customers go first.

The right policy depends on what we want to minimize.

### 2. Scheduling: SPT and WSPT

#### Hospital scheduling setup (p.9–10)
- One doctor. All patients are waiting at time 0. Patient i has a known processing time pᵢ. One patient at a time, and each consultation runs to completion.
- **Completion time = waiting time + processing time:**  **Cᵢ = Wᵢ + pᵢ**
- Goal: minimize total completion time **Σ Cᵢ**.
- Why this also minimizes total waiting: **Σ Cᵢ = Σ Wᵢ + Σ pᵢ**, and Σ pᵢ is the same for every order. Minimizing Σ Cᵢ is therefore the same as minimizing Σ Wᵢ.

#### Two orders compared (p.11)
p₁ = 10, p₂ = 15, p₃ = 7 min.

| | Option 1: 1 → 2 → 3 | Option 2: 3 → 1 → 2 |
|---|---|---|
| Completion times | C₁ = 10, C₂ = 25, C₃ = 32 | C₃ = 7, C₁ = 17, C₂ = 32 |
| Σ Cᵢ | 67 min | **56 min** |
| Σ Wᵢ | 0 + 10 + 25 = 35 min | 0 + 7 + 17 = **24 min** |

Option 2, which puts the shortest job first, is better.

#### Partner activity (p.12–13)
p = 6, 5, 8, 15 for patients 1–4. **SPT order: 2 → 1 → 3 → 4.**

| Patient | pᵢ | Place | Cᵢ |
|---|---|---|---|
| 2 | 5 | 1 | 5 |
| 1 | 6 | 2 | 5 + 6 = 11 |
| 3 | 8 | 3 | 11 + 8 = 19 |
| 4 | 15 | 4 | 19 + 15 = 34 |

- Σ Cᵢ = 5 + 11 + 19 + 34 = **69 min**
- Σ Wᵢ = 69 − (5 + 6 + 8 + 15) = 69 − 34 = **35 min**

#### Why SPT works (p.14)
Σ Cᵢ = **4×5 + 3×6 + 2×8 + 1×15** = 69.
The **first** job's time is counted in **every** later completion time (here 4 times). The last job's time is counted only once. So shorter jobs should go earlier, where they are counted more often.

#### SPT rule (p.15)
*Setup:* all n units ready at time 0, one server, known processing times.
*Rule:* repeatedly pick the remaining unit with the **shortest processing time**. This minimizes Σ Cᵢ and Σ Wᵢ.

#### Weighted SPT (WSPT): scheduling with priorities (p.16–18)
- Each patient has a weight wᵢ. A higher weight means each minute of their waiting costs more. In the example, H = 4, M = 2, L = 1.
- Goal: minimize **Σ wᵢCᵢ**. This also minimizes Σ wᵢWᵢ, because Σ wᵢCᵢ = Σ wᵢWᵢ + Σ wᵢpᵢ and the last term is fixed.
- **WSPT rule:** repeatedly pick the remaining unit with the **smallest ratio pᵢ / wᵢ**.

*Example (p.17):*
| Patient | pᵢ | wᵢ | pᵢ/wᵢ |
|---|---|---|---|
| 1 | 6 | 4 (H) | 1.5 |
| 2 | 5 | 1 (L) | 5 |
| 3 | 8 | 2 (M) | 4 |
| 4 | 15 | 1 (L) | 15 |

**WSPT order: 1 → 3 → 2 → 4.** Patient 1 is no longer the shortest job, but it moves to the front because of its high weight.

Where else waiting costs differ: urgent care needs, or jobs with different delay costs.

#### Partner activity: priorities (p.19–20)
**Order: 2 → 7 → 9 → 5 → 1 → 4 → 8 → 6 → 3 → 10**

| Patient | pᵢ | wᵢ | pᵢ/wᵢ | Rank | Cᵢ (running total) | wᵢCᵢ |
|---|---|---|---|---|---|---|
| 2 | 5 | 4 | 1.25 | 1 | 5 | 20 |
| 7 | 10 | 4 | 2.5 | 2 | 15 | 60 |
| 9 | 13 | 4 | 3.25 | 3 | 28 | 112 |
| 5 | 15 | 4 | 3.75 | 4 | 43 | 172 |
| 1 | 6 | 1 | 6 | 5 | 49 | 49 |
| 4 | 8 | 1 | 8 | 6 | 57 | 57 |
| 8 | 9 | 1 | 9 | 7 | 66 | 66 |
| 6 | 19 | 2 | 9.5 | 8 | 85 | 170 |
| 3 | 20 | 2 | 10 | 9 | 105 | 210 |
| 10 | 17 | 1 | 17 | 10 | 122 | 122 |

- **Σ wᵢCᵢ = 1038**
- **Σ wᵢWᵢ = 1038 − Σ wᵢpᵢ = 1038 − 290 = 748**
- Tip: compute Cᵢ by adding up the **actual** processing times in service order (not the ratios).

### 3. Variability in a process

**One queue, one server** is the model for this lecture. Lecture 5 covers multiple servers and matching systems (p.22).

Process flow analysis used **averages** (input rate, throughput R, flow time T, inventory I = R × T). Averages summarize overall performance, but they don't show variation (p.23).
> **Flow time = waiting time + service time**

#### The ATM experiment (p.24–27)
One ATM. Average arrival rate is 0.5 customer/min and average service time is 1 min in all three cases.

| Case | Setup | Waits | Average wait |
|---|---|---|---|
| Regular | Arrivals at 2, 4, 6, 8; service 1 min each | 0, 0, 0, 0 | **0 min** |
| Clustered arrivals | Pairs arrive at 4, 4, 8, 8; service 1 min each | 0, 1, 0, 1 | **0.5 min** |
| Variable service | Arrivals every 2 min; services 2.5, 0.5, 0.5, 0.5 (mean 1) | 0, 0.5, 0, 0 | **0.125 min** |

| ATM schedule | Mean waiting (min) | Mean queue (customers) | Mean flow time (min) |
|---|---|---|---|
| Regular | 0 | 0 | 1 |
| Clustered arrivals | 0.5 | 0.25 | 1.5 |
| Variable service | 0.125 | 0.0625 | 1.125 |

- Mean queue = λ × mean wait, by Little's Law (e.g., 0.5 × 0.5 = 0.25).
- Queue inventory counts **only** customers waiting, not the one being served.
- **Key lesson: average rates alone do not determine the queue. Variability matters.**

**Two sources of variability (p.28–30):**
- **Interarrival time A**: the time between consecutive arrivals.
- **Service time S**: the processing time one customer needs.

A probability model describes which values can occur and how likely they are, the **average** (expectation), and the **spread** (variance). Arrival *counts* are **discrete** random variables. Arrival gaps and service *durations* are **continuous** random variables (p.31).

### 4. Probability theory

#### Random variables (p.33)
A **random variable** assigns a number to an uncertain outcome.
| Type | Example | Possible values |
|---|---|---|
| Discrete | Number of arrivals in 10 min | 0, 1, 2, … customers |
| Continuous | Time between consecutive arrivals | Durations in minutes |
| Continuous | Time to serve one customer | Durations in minutes |

Discrete values form a countable list. Continuous values can take any value in an interval.

#### Running example (p.34)
X = items in the next order: **1 item (0.25), 3 items (0.50), 5 items (0.25).**

#### Expectation (p.35)
> **𝔼[X] = Σᵢ xᵢ · Pr(X = xᵢ)**, the probability-weighted average of all values.

𝔼[X] = 1(0.25) + 3(0.50) + 5(0.25) = 0.25 + 1.50 + 1.25 = **3 items**.
We use the expectation as our prediction. An expected value need not be a possible outcome.

#### Prediction error (p.36)
Prediction error = actual outcome − predicted value. The errors are −2, 0, +2.
The average signed error is 𝔼[X − 3] = 0.25(−2) + 0.5(0) + 0.25(2) = **0**, because positive and negative errors cancel. **Squaring** the errors measures their size without cancelling.

#### Variance (p.37)
> **Var(X) = 𝔼[(X − 𝔼[X])²]**, the expected squared prediction error.

Var(X) = 0.25(4) + 0.50(0) + 0.25(4) = **2 items²**.
A smaller variance means a smaller average squared prediction error.

**Same mean, different variability (p.38):** two order patterns both have mean 3. Pattern A has Var = 0.5 items² and pattern B has Var = 2 items². Predicting 3 gives a smaller error for A.

#### Standard deviation (p.39)
> **σ = √Var(X)**, the root mean squared error, in the **original units**.

σ = √2 ≈ **1.41 items**.

#### Coefficient of variation (p.40–41)
> **CV = σ / 𝔼[X]**, the error relative to the mean. It has **no units**.

CV = √2 / 3 ≈ 0.471 = **47.1%**. The error scale is about 47% of the prediction.

*Absolute vs. relative error:*
| Mean | SD | CV |
|---|---|---|
| 1,000,000 units | 100 units | 100/1,000,000 = 0.01% |
| 1,000 units | 100 units | 100/1,000 = 10% |

The same 100-unit error is tiny relative to one million but large relative to one thousand.

#### Rates (p.42)
- **λ (lambda)** = arrival rate = average number of customers arriving per hour.
- **μ (mu)** = service capacity rate = average number served per hour if the server works continuously.
- Rates describe averages. A **distribution** describes variability.

#### Poisson random variable: counts (p.43–45)
N = number of arrivals in a time window. With a constant average rate λ per hour, the mean count in 10 minutes is λ × 10/60 = λ/6, so **N ~ Poisson(λ/6)**. A Poisson variable has one parameter, its mean.

> **For a Poisson count, variance = mean.**

| Quantity | Formula (10-min window) |
|---|---|
| 𝔼[N] | λ/6 customers |
| Var(N) | λ/6 customers² (same as the mean) |
| SD(N) | √(λ/6) customers |
| CV(N) | √(6/λ) (no units) |

*ATM example (p.45):* λ = 12/hr, so N ~ Poisson(2). Mean = 2, Var = 2, SD = √2 ≈ 1.41, CV = 1/√2 ≈ **0.707**.

#### Exponential random variable: durations (p.46–50)
Models a random **duration until an event**: the next arrival (interarrival time), the end of service (service duration), or an equipment failure. It has one parameter, the event **rate r**: A ~ Exponential(r).

| | Interarrival time A ~ Exp(λ) | Service duration S ~ Exp(μ) |
|---|---|---|
| Mean | **1/λ** | **1/μ** |
| Variance | 1/λ² | 1/μ² |
| SD | **1/λ** | **1/μ** |
| CV | **1** | **1** |

> **For an exponential random variable, SD = mean, so CV = 1.**
> The mean gap is the reciprocal of the arrival rate. The mean service time is the reciprocal of the service capacity.

*ATM example (p.49–50):* λ = 12/hr, μ = 30/hr.
| | Interarrival time | Service duration |
|---|---|---|
| Mean | 60/12 = 5 min | 60/30 = 2 min |
| Variance | 25 min² | 4 min² |
| SD | 5 min | 2 min |
| CV | 1 | 1 |

#### Summary of ATM models (p.51)
| Random outcome | Model | Mean | CV |
|---|---|---|---|
| Arrival count N in 10 min (discrete) | Poisson(λ/6) | λ/6 | √(6/λ) |
| Interarrival time A, in hours (continuous) | Exponential(λ) | 1/λ | 1 |
| Service duration S, in hours (continuous) | Exponential(μ) | 1/μ | 1 |

These are common modelling choices, not the only ones. **Queueing formulas use the CVs of arrival gaps and service durations.**

### 5. Single-server queue analysis

**Model (p.53–61):** Input → **Buffer** (the queue) → **Server** → Output.

| Symbol | Meaning |
|---|---|
| λ | Average arrival (input) rate |
| 1/λ | Average interarrival time, 𝔼[A] |
| μ | Average capacity (service) rate |
| 1/μ | Average service time, 𝔼[S] |
| **ρ = λ/μ** | **Server utilization** |

- **Stability:** the system is stable when **λ < μ, i.e., ρ < 1**. Stability is assumed unless stated otherwise.
- When stable, **throughput rate = min{λ, μ} = λ**.

#### Inventory and time in each part (p.62–64)
| Inventory | Time |
|---|---|
| Iq = average number in the **queue** (buffer) | Tq = average **waiting** time in the queue |
| Is = average number **at the server** | Ts = average **service** time |
| **I = Iq + Is** (in the process) | **T = Tq + Ts** (flow time) |

Little's Law applies to each part:
- **I = λT**, **Iq = λTq**, **Is = λTs**
- Ts = 1/μ, so **Is = λ/μ = ρ** (utilization)

#### The Pollaczek–Khinchin (PK) formula (p.65–67)
For ρ = λ/μ < 1:

> ## **Iq ≈ ρ² / (1 − ρ) × (C_A² + C_S²) / 2**
> ## **Tq ≈ Iq / λ** (Little's Law)

- Iq = average queue length. It does **not** include the customer in service.
- ρ = utilization = λ/μ
- C_A = CV of interarrival times = SD(A)/𝔼[A]
- C_S = CV of service times = SD(S)/𝔼[S]
- The formula has two parts: a **utilization term** ρ²/(1 − ρ), set by the averages, and a **variability term** (C_A² + C_S²)/2.

#### Worked examples (restaurant, single server)

**Scenario 1 (p.69–70):** λ = 4/hr, mean service 10 min, both exponential.
- 𝔼[A] = 1/4 hr, σ(A) = 1/4 hr, so C_A = 1. μ = 6/hr, 𝔼[S] = 1/6 hr, σ(S) = 1/6 hr, so C_S = 1.
- ρ = 4/6 = 2/3
- Iq ≈ (2/3)² / (1/3) × (1 + 1)/2 = (4/9)/(1/3) = **4/3 ≈ 1.33 customers**
- Tq = Iq/λ = (4/3)/4 = **1/3 hr = 20 min**

**Scenario 2 (p.71–72):** λ = 4/hr, SD of interarrival time = 5 min; mean service 10 min, SD = 3 min.
- σ(A) = 5 min = 1/12 hr, so C_A = (1/12)/(1/4) = **1/3**. σ(S) = 3 min = 1/20 hr, so C_S = (1/20)/(1/6) = **3/10**.
- ρ = 2/3
- Iq ≈ (4/9)/(1/3) × [(1/3)² + (3/10)²]/2 = (4/3) × (0.1111 + 0.09)/2 ≈ **0.134 customers**
- Tq = 0.134/4 ≈ **0.034 hr ≈ 2 min**
- Same averages as Scenario 1, but much less variability gives a **10× shorter queue**.

#### Queue notation (p.73–76; L5 p.67)
**Letter 1 / Letter 2 / Number** = interarrival distribution / service distribution / number of servers.
| Letter | Meaning | CV |
|---|---|---|
| **G** | General random variable | any (CV = SD/mean) |
| **M** | Exponential ("Markovian") | 1 |
| **D** | Deterministic (constant) | 0 |

- **G/G/1**: the PK formula as written (an approximation).
- **M/M/1**: C_A = C_S = 1. The PK formula is **exact**:
  > **Iq = ρ²/(1 − ρ) = λ² / [μ(μ − λ)]**, **Tq = λ / [μ(μ − λ)]**
- **M/D/1**: C_A = 1, C_S = 0 (a constant has SD 0):
  > **Iq ≈ ρ²/(1 − ρ) × ½ = λ² / [2μ(μ − λ)]** (half the M/M/1 queue)

**Why exponential distributions are used so often (p.74):** they are often a good approximation of reality; they are easy to analyze because CV = 1; and if interarrival (or service) times are exponential, the number of arrivals (or completions) in a fixed period is **Poisson**.

#### More worked examples
**M/D/1 (p.77–78):** λ = 4/hr exponential arrivals, service exactly 10 min (μ = 6, C_S = 0), ρ = 2/3.
- Iq ≈ 4² / [2 × 6 × (6 − 4)] = 16/24 = **2/3 customer**
- Tq = (2/3)/4 = **1/6 hr = 10 min**
- This is exactly half of the M/M/1 result in Scenario 1 (4/3 and 20 min).

**Professor's office hours (p.79–81):** λ = 10 students/hr, exponential arrivals.
- (a) μ = 20/hr, exponential service (M/M/1): ρ = 1/2. Iq = (1/4)/(1/2) × 1 = **1/2 student**. Tq = (1/2)/10 = **1/20 hr = 3 min**.
- (b) Exactly 3 min per student (M/D/1, μ = 20, C_S = 0): Iq = (1/2) × (1 + 0)/2 = **1/4 student**. Tq = (1/4)/10 = **1/40 hr = 1.5 min**.

#### Impact of utilization (p.82–83)
- As **ρ → 100%**, Iq and Tq **blow up**, because the 1/(1 − ρ) term grows without limit. The curve is very steep near 100%.
- **Is higher utilization always better?** Recall utilization = throughput ÷ capacity ≤ 100%.
  - **No variability:** maximizing utilization is a **good** idea.
  - **With variability:** maximizing utilization is a **very bad** idea, because queues and waits explode.

### 6. The Operations Management triangle

**Utilization and queue inventory, M/M/1 (p.85):** Iq = ρ²/(1 − ρ)
| ρ | 50% | 80% | 90% | 95% |
|---|---|---|---|---|
| Iq | 0.50 | 3.20 | 8.10 | 18.05 |

Going from 80% to 90% utilization **more than doubles** the queue.

**Variability and queue inventory (p.86):** at 80% utilization with Poisson arrivals, exponential service gives Iq = **3.2**, while constant service gives Iq = **1.6**. Less variable service supports a shorter queue at the same utilization.

**More capacity or less variability? (p.87):** demand is 8/hr with Poisson arrivals.
| Option | Service time | Capacity/hr | ρ | Iq | Waiting (min) |
|---|---|---|---|---|---|
| Current | 6 min, exponential | 10 | 80% | 3.20 | 3.2/8 hr = **24** |
| Faster service | 5 min, exponential | 12 | 66.7% | 1.33 | **10** |
| Constant service | 6 min, constant | 10 | 80% | 1.60 | **12** |

All three have enough capacity and serve 8/hr, but their waiting times differ.

**The same queue with less capacity (p.88):** target Iq = 1.6 with demand of 8/hr.
- M/M/1: solve ρ²/(1 − ρ) = 1.6, giving ρ ≈ 69.7%, so μ = 8/0.697 ≈ **11.48/hr**. Wait = 12 min.
- M/D/1: **10/hr** (ρ = 80%) already gives Iq = 1.6. Wait = 12 min.
- **Reducing variability can meet the same waiting standard with less capacity.**

**The OM triangle (p.89; L5 p.45–46):** at a given demand level, choose a feasible combination of three levers:
| Lever | Meaning | Cost |
|---|---|---|
| **Capacity** | Pay for more processing ability | Capacity cost (staff, equipment, idle time) |
| **Inventory** | Accept more waiting work (longer queues) | Waiting cost (customers' time) |
| **Information** | Use information to **reduce variability** (e.g., scheduling) | Improvement cost |

> **High variability and near-full utilization imply long queues.**

**Lecture 4 summary (p.90):** average arrival and service rates do not determine waiting. Probability models describe variability. Single-server models link variability and utilization to queue inventory and waiting time. The OM triangle links these to capacity, service standards and improvement costs.

---

## Lecture 5: Queueing Analysis II

### Recap (p.2–38)
Lecture 5 opens with a long recap of Lecture 4: structures and policies; same averages but different queues (the ATM table); expectation, variance, SD and CV; Poisson and exponential variables; λ, μ, ρ, stability; the PK formula; G/G/1, M/M/1, M/D/1; and the M/D/1 and office-hours examples.

**Additional points made in the Lecture 5 recap:**
- In the PK formula, **ρ is set by average input and average capacity**, while **C_A and C_S are set by the variability** of arrivals and service (p.3).
- **Summary table of single-server models (p.30):**

| Model | C_A | C_S | (C_A² + C_S²)/2 | Iq |
|---|---|---|---|---|
| G/G/1 | C_A | C_S | (C_A² + C_S²)/2 | ρ²/(1 − ρ) × (C_A² + C_S²)/2 |
| M/M/1 | 1 | 1 | 1 | ρ²/(1 − ρ) |
| M/D/1 | 1 | 0 | 1/2 | ρ²/(1 − ρ) × 1/2 |

  Always: **ρ = λ/μ** and **Tq = Iq/λ**.
- **Impact of variability (p.37):** for any utilization, higher C_A or C_S shifts the whole queue-length curve **up**.
- **Why high utilization is bad with variability (p.38):** both the average queue length and the waiting time increase as utilization rises.

**Agenda:** (1) the OM triangle, (2) multi-server queue analysis, (3) advanced queueing systems.

### 1. The OM triangle (p.40–46)
This repeats Lecture 4 §6: the utilization table, M/M/1 vs. M/D/1, more capacity vs. less variability, and the 11.48/hr vs. 10/hr result.

*Clinic example (p.46):* a clinic serves the same number of patients daily, but arrival times and appointment lengths vary.
| Lever | Action | Cost |
|---|---|---|
| Capacity | Add a doctor to reduce waiting at busy times | Higher staffing, possible idle time |
| Inventory | Keep staffing, let patients wait (inventory = waiting patients) | Patients' time |
| Information | Use each visit's reason to plan appointment slots and spread arrivals | Information collection and better scheduling |

Balance capacity cost, waiting cost and improvement cost.

### 2. Multi-server queues

#### Setup (p.48–49)
- **One shared queue** feeding **c identical servers**, each with service rate μ.
- Service policy: **first come, first served**.
- Arrival rate λ. **Stability requires λ < cμ.** Throughput = λ.

#### Utilization of a resource pool (p.50–51)
| | The resource pool | Each server |
|---|---|---|
| Input rate | λ | λ/c (demand is shared evenly, because the servers are identical) |
| Capacity rate | cμ | μ |
| **Utilization** | **λ/(cμ)** | **λ/(cμ)** |

> **ρ = λ / (cμ)**. The pool's utilization equals each server's utilization.

#### Inventory in service (p.52–53)
Little's Law with Ts = 1/μ gives **Is = λ × (1/μ) = cρ**, the average number of busy servers.

#### Multi-server PK formula (p.54–55)
> ## **Iq ≈ ρ^√(2(c+1)) / (1 − ρ) × (C_A² + C_S²) / 2**, with **ρ = λ/(cμ)**
> ## **Tq ≈ Iq / λ**

- The exponent on ρ is **√(2(c + 1))**. Check: with c = 1 it is √4 = 2, which gives back the single-server formula.
- This describes a **G/G/c** queue: general arrivals / general service / c servers.
- **M/M/c** (p.63): C_A = C_S = 1, so **Iq ≈ ρ^√(2(c+1)) / (1 − ρ)**.

#### Example: CUHK card office (p.56–57)
λ = 90 students/hr, mean service 3 min so μ = 20/hr per server, c = 5, both exponential.
- ρ = 90 / (5 × 20) = **0.9**
- Exponent = √(2 × 6) = √12 ≈ 3.46
- Iq ≈ 0.9^3.46 / (1 − 0.9) × (1 + 1)/2 ≈ 0.694 / 0.1 ≈ **6.94 students**
- Tq = 6.94 / 90 ≈ **0.077 hr ≈ 4.63 min**

#### Pooling: one G/G/c queue vs. c separate G/G/1 queues (p.58–62)
Assume the same total arrival rate and the same capacity per server, so the utilization ρ is the same in both.
- **c separate G/G/1 queues**, each getting λ/c: total Iq = **c × ρ²/(1 − ρ)** × (C_A² + C_S²)/2
- **One shared G/G/c queue:** Iq = **ρ^√(2(c+1))/(1 − ρ)** × (C_A² + C_S²)/2
- *c = 3:* three G/G/1 queues give **3 × ρ²/(1 − ρ)** × (·) **>** one G/G/3 queue giving **ρ^(2√2)/(1 − ρ)** × (·)

> **One shared queue (pooling) gives a shorter total queue and shorter waits than separate queues.** This holds because ρ < 1, so a higher power of ρ is smaller, and there is no factor of c in front.

*Chart (p.62):* λ = 5, μ = 6, ρ = 5/(6c). As c grows, the M/M/c queue falls far below the total of c separate M/M/1 queues. For example, with c = 2: 0.60 for separate queues vs. ≈ 0.20 for one shared queue.

#### Example: bank tellers (p.64–66)
All times exponential.

**Scenario 1: two separate queues (two M/M/1 queues)**
- Queue 1: λ = 5, μ = 10, so Iq = λ²/[μ(μ − λ)] = 25/(10 × 5) = **1/2**
- Queue 2: λ = 15, μ = 20, so Iq = 225/(20 × 5) = **9/4**
- Total = 1/2 + 9/4 = **2.75 customers**

**Scenario 2: one shared queue (M/M/2)**
- λ = 20, μ = 15, c = 2, so ρ = 20/30 = **2/3**
- Iq = (2/3)^√6 / (1/3) ≈ **1.11 customers**

Both scenarios have the same total arrivals (20/hr) and the same total capacity (30/hr), but **the shared queue has far fewer people waiting.**

#### Summary: variability in processes (p.68)
- With variability, averages alone do not determine queue length.
- Queue length also depends on the variability, measured by C_A and C_S.
- The PK formula and Little's Law quantify the effect on inventory (queue length) and flow time (waiting time).

### 3. Advanced queueing systems: game matchmaking

**Video game matchmaking (p.70–71):** players with different skill ratings (e.g., 1000, 1400) arrive over time, wait in a **matching pool**, and leave together once matched.
| System | Who waits? | What ends the wait? |
|---|---|---|
| Service queue | Customers | A server begins service |
| Uber-style matching | Riders and drivers | A pair forms across the two sides |
| **Game matching** (one-sided) | Players in one pool | Players form a match within the pool |

**Matching policy (p.72):** the platform decides **when** to match (start now or wait for more players) and **whom** to match (which players compete). The objective is to **maximize player engagement**.

**What makes a match engaging? (p.73–75)**
- *Argentina vs. France, 2022 World Cup final:* the win probability swung repeatedly (2–0, 2–2, 3–2, 3–3, then penalties). This shows an engaging, uncertain contest.
- **Suspense** (Ely, Frankel & Kamenica, 2015, *JPE*): the next event could still change your belief about who wins, so the outcome stays uncertain to the end.
- **Surprise:** an event sharply changes your belief. Large reversals make a contest exciting.
- *Evidence from CS:GO on Twitch* (Simonov, Ursu & Zheng, 2023, *JMR*): data on 104 professional games and viewer entry/exit records. **More suspense keeps viewers watching.** More balanced round-win probabilities increase predicted viewership.
- **Matching implication:** pair players or teams of **similar strength**.

**Match quality vs. waiting time (p.76):** four players arrive in order with ratings 1000, 1400, 1010, 1390.
| Policy | Pairs | Skill gaps | Waiting |
|---|---|---|---|
| Match as soon as two arrive | 1000 vs 1400; 1010 vs 1390 | 400, 380 | Shorter |
| Wait for four, then match | 1000 vs 1010; 1400 vs 1390 | 10, 10 | Longer |

Waiting creates more options and better matches, but players may cancel or quit if they wait too long. **Match quality must be balanced against waiting time.**

**Drawbacks of balanced matchmaking (p.77):**
- **Long queues for top players**, because equally skilled opponents are scarce.
- **Matchmaking shapes winning chances**, because your win chance depends on the opponents chosen.
- **Improving brings tougher opponents**, so win rates may stay near 50% even as skill improves. If every match starts at 50–50, winning can start to feel like a coin flip.

**Next (p.78):** inventory management. How much should we order for random demand, and when?

---

## Formula sheet (Lectures 4–5)

| Concept | Formula |
|---|---|
| Completion time | Cᵢ = Wᵢ + pᵢ; Σ Cᵢ = Σ Wᵢ + Σ pᵢ |
| SPT rule | Serve the shortest pᵢ first; minimizes Σ Cᵢ and Σ Wᵢ |
| WSPT rule | Serve the smallest pᵢ/wᵢ first; minimizes Σ wᵢCᵢ and Σ wᵢWᵢ |
| Expectation | 𝔼[X] = Σ xᵢ Pr(X = xᵢ) |
| Variance | Var(X) = 𝔼[(X − 𝔼[X])²] |
| Standard deviation | σ = √Var(X) |
| Coefficient of variation | CV = σ / 𝔼[X] (no units) |
| Poisson count (mean m) | Var = mean = m; SD = √m; CV = 1/√m |
| Exponential(r) | Mean = SD = 1/r; Var = 1/r²; **CV = 1** |
| Constant (deterministic) | SD = 0, **CV = 0** |
| Single-server utilization | ρ = λ/μ; stable if ρ < 1 |
| Multi-server utilization | ρ = λ/(cμ); stable if λ < cμ |
| Little's Law by part | I = λT, Iq = λTq, Is = λTs; I = Iq + Is; T = Tq + Ts |
| Inventory in service | Single server: Is = ρ. c servers: Is = cρ |
| **PK formula (G/G/1)** | **Iq ≈ ρ²/(1 − ρ) × (C_A² + C_S²)/2** |
| M/M/1 (exact) | Iq = ρ²/(1 − ρ) = λ²/[μ(μ − λ)]; Tq = λ/[μ(μ − λ)] |
| M/D/1 | Iq ≈ ρ²/(1 − ρ) × 1/2 = λ²/[2μ(μ − λ)] |
| **Multi-server PK (G/G/c)** | **Iq ≈ ρ^√(2(c+1))/(1 − ρ) × (C_A² + C_S²)/2** |
| M/M/c | Iq ≈ ρ^√(2(c+1))/(1 − ρ) |
| Waiting time | Tq = Iq / λ |
| Flow time | T = Tq + 1/μ |

## Exam tips and common mistakes
1. **Use the same time units throughout.** Convert λ, μ and all SDs to the same unit (usually hours) before computing CVs and ρ.
2. **CV = SD ÷ mean** of the *time* (interarrival or service), not of the rate. For example, service mean 10 min and SD 3 min gives C_S = 0.3.
3. **Identify the model from the wording.** "Exponential" means CV = 1. "Exactly / constant / deterministic" means CV = 0. Otherwise compute CV from the given SD.
4. **Iq excludes the customer in service.** Total in the system is I = Iq + ρ (single server) or Iq + cρ (c servers).
5. **Multi-server ρ = λ/(cμ)**, not λ/μ. Check stability first: λ < cμ.
6. **Comparing separate queues vs. one shared queue:** compute Iq for each separate queue with its *own* λ and μ, add them, then compare with the pooled formula.
7. **WSPT ranks by pᵢ/wᵢ, but Cᵢ adds up the real pᵢ** in service order.
8. **Higher utilization is not always better.** With variability, queues explode as ρ approaches 1.

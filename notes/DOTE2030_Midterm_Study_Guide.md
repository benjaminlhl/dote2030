# DOTE 2030 — Midterm Study Guide (Lectures 2–5)

*Built from `Midterm_review.pdf` (25 pages) plus the lecture slides. Review page numbers are written "R p.x". Lecture pages refer to the notes files and slide PDFs (L2, L3 = Lectures 2 and 3; L4, L5 = the solution versions of Lectures 4 and 5).*

**Companion notes:** `notes/DOTE2030_Lectures_1-3_Notes.md` and `notes/DOTE2030_Lectures_4-5_Notes.md`

---

## 1. What the midterm covers

| Topic | Lecture | Review problems |
|---|---|---|
| Process mapping, flow time (including activities done at the same time) | L2 | T/F 1, 9; SA 1(c)(h), 2(a), 6(a)(b), 7(b) |
| Unit load, capacity rate, bottleneck, resource pooling | L2 | T/F 2, 3, 5, 6, 11, 12; SA 1(a)(f)(g), 2(b)(c), 5, 6(c), 7(a), 11(a) |
| Throughput, utilization, implied utilization | L2 | T/F 4, 7, 8; SA 1(d), 6(d)(e), 7(c), 10, 11(b) |
| Profit decisions (rent or hire a resource) | L2 | SA 1(e), 11(c) |
| Inventory build-up diagrams (discrete and continuous) | L3 | T/F 10; SA 3, 4, 8, 9, 12(a) |
| Little's Law | L3 | T/F 13; SA 7(d) |
| SPT / WSPT scheduling | L4 | *(defined at R p.5, no worked problem; practise with L4 p.12–20)* |
| Probability: CV, Poisson, exponential | L4 | T/F 16, 17 |
| Single-server queues: PK formula, M/M/1, M/D/1, D/G/1 | L4 | T/F 14, 15, 18, 19; SA 12(b)(c i–iii)(d)(f) |
| Multi-server queues, pooling | L5 | SA 12(c v), 12(e), 12(g) |
| OM triangle | L4/L5 | Definition 19 (R p.5) |

---

## 2. Definitions the review emphasises (R p.3–6)

These are the exact definitions the instructor uses. Learn the wording.

1. **Flow time of an activity / process**: the *shortest possible* time (theoretical, "perfect world"). With activities done at the same time, take the **longest path** (R p.16, SA 6(b)).
2. **Unit load of a resource** = sum of flow times of **all** activities that use the resource.
3. **Resource pool**: resources that perform the same set of activities. Pool capacity = number of resources × individual capacity.
4. **Capacity rate of the process** = the **smallest** capacity rate of any resource or pool. **Only resources can be bottlenecks**, not activities (T/F 12).
5. **Bottleneck**: any resource or pool whose capacity equals the process capacity. There can be more than one.
6. **Throughput rate** = min{input rate, capacity rate}.
7. **Utilization** = throughput ÷ resource capacity. It is **never above 100%**.
8. **Implied utilization** = input ÷ resource capacity. It **can exceed 100%**.
9. **Inventory is never below 0.** In a continuous diagram, slope = input rate − capacity rate (while a queue exists).
10. **Little's Law** I = R × T requires a stable process.
11. **OM triangle**: (i) increase capacity, (ii) add buffers (accept inventory), (iii) gather information to reduce variability.
12. **Single server:** ρ = λ/μ. **Multi-server:** ρ = λ/(cμ). The PK formula needs ρ < 1.

**Worked example on R p.3–4** (Workers 1 and 2 pool on A, 10 min each; Worker 3 does B 5 + C 2; Worker 4 does D 3):
- Flow time = 10 + 5 + 2 + 3 = 20 min
- Unit loads: W1 = W2 = 10, W3 = 7, W4 = 3 min
- Capacities: pool 12/hr, W3 60/7 = 8.57/hr, W4 20/hr. **Bottleneck: W3, process capacity 8.57/hr.**
- With input 10/hr: throughput = 8.57/hr. Utilization: W3 100%, W4 43%, pool 71%. Implied utilization: W3 117%, W4 50%, pool 83.33%.

---

## 3. True/False traps (R p.7–10)

| # | Statement (short) | Answer | Why |
|---|---|---|---|
| 1, 9 | Theoretical flow time = every unit's time | **F** | It is the *shortest* time. Real units also wait in buffers. |
| 2 | One bottleneck; shorten an activity it does, so process capacity rises | **T** | The bottleneck's unit load falls, so its capacity rises. |
| 3 | Hire a second identical cashier (10/hr), so pool = 20/hr | **T** | Pool = 2 × 10. |
| 4 | Implied utilization > 100%, so inventory builds | **T** | Input > that resource's capacity ≥ process capacity. |
| 5 | Shorten *any* activity, so process capacity rises | **F** | Only if it is done by the bottleneck. |
| 6 | Shorten an activity resource R does, so R's capacity rises | **T** | R's unit load falls. |
| 7 | Throughput = capacity, so inventory builds | **F** | Input could *equal* capacity exactly. |
| 8 | Input > capacity, so bottleneck utilization > 100% | **F** | **Implied** utilization > 100%. Utilization is never above 100%. |
| 10 | Capacity 12/hr, 10 arrive from 6–7 pm, so the 7 pm queue is shorter than at 6 pm | **F** | The 6 pm queue might already be 0. |
| 11 | Handsaw 2 h + nailing 1 h (you), sanding 1 h (partner); handsaw is the bottleneck | **F** | **You** have a 3 h unit load. |
| 12 | Each *activity* has a capacity rate | **F** | Only *resources* have capacity rates. |
| 13 | I = 100, T = 5 h, so R = 500/h | **F** | R = I/T = **20/h**. |
| 14 | Utilization up, so Iq down | **F** | Iq rises as ρ rises. |
| 15 | D/D/1 has Iq = 0 | **T** | C_A = C_S = 0. |
| 16 | Mean = SD = 10 min, so the times are exponential | **F** | Other distributions share the same mean and SD. You must be told or assume it. |
| 17 | Poisson with 15 arrivals/h, so SD of interarrival = 4 min | **T** | Exponential(15): SD = mean = 1/15 h = 4 min. |
| 18 | Arrival variance up, so more people *being served* | **F** | PK is about the *queue* Iq. Is = ρ does not change. |
| 19 | Double λ and μ with the same SDs, so Iq doubles | **F** | ρ is unchanged, but C_A and C_S each double, so Iq is **multiplied by 4**. |

**Useful rewrite of the PK formula (T/F 14 and 19):** Iq ≈ λ²/[μ(μ−λ)] × (λ²σ_A² + μ²σ_S²)/2

---

## 4. Short-answer problems: method and checked answers

I re-did every calculation. ✅ = the review's answer is correct. ⚠️ = see Section 5.

| SA | Topic | Key steps | Answer |
|---|---|---|---|
| 1(a) | Max throughput | Unit loads A 10, B 20, C 15 min, so capacities 6 / 3 / 4 per hr; minimum = B | **3 units/hr** ✅ ⚠️ typo |
| 1(b) | Cycle time | Cycle time = 1 / throughput = 1/3 hr | **1/3 hr per unit = 20 min** ⚠️ units wrong in review |
| 1(c) | Flow time | 10 + 20 + 15 | **45 min = 0.75 hr** ✅ |
| 1(d) | Utilizations at 3/hr | 3/6, 3/3, 3/4 | **A 50%, B 100%, C 75%** ✅ |
| 1(e) | Rent a resource for $14/hr? | Only the bottleneck B helps. Without renting: 3 × $10 = $30/hr. With 2 × B: capacity becomes 4 (C is now the bottleneck), so $40 − $14 = $26/hr | **Don't rent** ✅ ⚠️ typo |
| 1(f) | Activity A also needs C | C's unit load = 10 + 15 = 25 min, so 2.4/hr | **C is the bottleneck, 2.4/hr** ✅ |
| 1(g) | Speed up C by 5 min | Without (f): no change (B is the bottleneck). With (f): C goes 25 → 20 min, so 2.4 → 3/hr | **Depends on whether (f) applies** ✅ |
| 1(h) | Effect on flow time | Flow time is the sum along the path | **Falls by 5 min** ✅ |
| 2(b) | Worker does A + C | Worker 25 min (2.4/hr), Machine B 12 (5/hr), Machine C 15 (4/hr), 2 reps 20 min each (pool 6/hr) | **Worker, 2.4/hr** ✅ |
| 2(c) | Useful reduction | Worker 25 → 15 min until Machine C (15 min) ties | **10 min** ✅ (not 5: the reps form a pool of 6/hr) |
| 3 | Continuous, start 65, +4/hr, 5.5 hr | End = 65 + 22 = 87. Area = 65 × 5.5 + ½ × 5.5 × 22 = 357.5 + 60.5 = 418 | **End 87 units; average 418/5.5 = 76 units** ✅ |
| 4 | Discrete POS table | End of hour: 2:00 → 0; 3:00 → 2; 4:00 → 2 + 9 = 11; 5:00 → max(0, 11 − 20) = 0 | **13/4 = 3.25 orders** ✅ |
| 5 | Prof A + B + C; TA does D | Prof 25 min (2.4/hr), TA 12.5 min (4.8/hr) | **2.4/hr, Prof is the bottleneck** ✅ |
| 6(b) | Burger ∥ fries | Paths: fries 1 + 1 + 3 + 1 = 6 vs burger 1 + 5 + 1 + 1 + 1 = 9 | **9 min** (not 13) ✅ |
| 6(c) | Capacities | Cashier 1 + 1 = 2 min, W1 1 + 3 = 4, Fryer 3, W2 5 + 1 + 1 = 7, Grill 5 | **W2 bottleneck, 8.57/hr** ✅ |
| 6(d) | Input 10/hr | min(10, 8.57) | **8.57/hr** ✅ |
| 6(e) | Input 5/hr | 5 ÷ each capacity | Cashier 16.67%, W1 33.33%, Fryer 25%, **W2 58.33%**, Grill 41.67% ✅ |
| 7 | = in-class exercise | Pool 12, W3 6, W4 12 per hr; flow time 25 min; at 3/hr: 25%, 50%, 25% | ✅ |
| 7(d) | Little's Law | I = 3/hr × 0.5 hr | **1.5 units** ✅ |
| 8 | Hospital, capacity 150/hr | Queue grows +50/hr from 11–12 to 50, then falls at 90 − 150 = **−60/hr**, so it empties at **12:50** | ⚠️ **review says 10; slide method gives 9.17** |
| 9 | Start 50, +5/hr, 4 hr | 50 × 4 + ½ × 4 × 20 = 240 | **60 units** ✅ |
| 10 | Oven 20 of 30 | 20/30 | **66.67%** ✅ |
| 11(a) | Bank | W1 4 + 2 = 6 min (10/hr), W2 3 + 7 = 10 min (6/hr), Computer 2 min (30/hr) | **6/hr, W2 bottleneck** ✅ |
| 11(b) | Input 12/hr | 12/10 | **120%** ✅ |
| 11(c) | Hire Worker 3? | Now: 6 × $10 − $40 = $20/hr. W3 on activity 3 or 4: W2 or W3 at 7 min = 8.57/hr, so $85.7 − $60 = $25.7/hr | **Hire, assign to activity 3 or 4** ✅ |
| 12(a) | Weekly diagram | A 37.5 + B 75 + C 50 + D 50 + E 37.5 = 250 | **250/7 = 35.71 tons** ✅ |
| 12(b) | Drive-through M/M/1, λ = 20, μ = 30 | ρ = 2/3. Iq = (4/9)/(1/3) = 4/3. I = 4/3 + 2/3 = 2. Tq = 4 min. T = 6 min | ✅ |
| 12(b vi) | Make service deterministic | M/D/1: Iq halves to 2/3. I = 2/3 + 2/3 = 4/3. T = (4/3)/20 hr | **4 min** ✅ |
| 12(c i–iii) | 3 separate M/M/1 lines, μ = 30 | Diamond λ = 10: T = 3 min. Silver λ = 20: 6 min. Regular λ = 28: Iq = 196/15, Tq = 28 min, T = 30 min | ✅ |
| 12(c iv) | Average over all flyers | (28 × 30 + 20 × 6 + 10 × 3)/58 = 990/58 | **17.07 min** ✅ |
| 12(c v) | Merge into M/M/3 | ρ = 58/90 = 0.644. Iq = ρ^√8/(1 − ρ) ≈ 0.812. Tq ≈ 0.84 min. T = 0.84 + 2 | **2.84 min** ✅ (pooling: 17.07 → 2.84 min) |
| 12(d) | Two independent M/M/1 queues | Drive-through: Iq = 64/20 = 16/5, Tq = 2/5 hr. Dining room: Iq = 400/300 = 4/3, Tq = 1/15 hr | **Total Iq = 68/15 ≈ 4.53; average Tq = (2/7)(2/5) + (5/7)(1/15) = 17/105 hr ≈ 0.162 hr** ✅ |
| 12(e) | Write PK formulas | D/M/2: ρ^√6/(1 − ρ) × ½. G/M/1: ρ²/(1 − ρ) × (C_A² + 1)/2. M/M/3: ρ^√8/(1 − ρ). M/G/c: ρ^√(2(c+1))/(1 − ρ) × (1 + C_S²)/2 | ✅ |
| 12(f) | Homework D/G/1 | λ = 10/day, C_A = 0. Service 1 hr = 1/24 day (μ = 24/day), SD ½ hr, so C_S = ½. ρ = 5/12. Iq = (25/144)/(7/12) × (¼)/2 = 25/672 | **Tq = 25/6720 ≈ 0.0037 days** ✅ ⚠️ unit typo |
| 12(g) | Two queues in series | Queue 1 G/M/1: λ = 15, C_A = ¼, μ = 60, ρ = ¼, Iq = 17/384, Tq ≈ 0.003 hr. Queue 2 G/M/4: μ = 4, ρ = 15/16, Iq ≈ 0.9375^√10/(1/16) × (1/16 + 1)/2 ≈ 6.93, Tq ≈ 0.462 hr | **≈ 0.465 hr on hold** ✅ |

---

## 5. Errors and typos in the review solutions ⚠️

1. **SA 8 (hospital): the answer 10 assumes the queue empties exactly at 1 pm.** By the slide rule (slope = input − capacity, L3 p.26), from 12–1 pm the queue falls at 90 − 150 = **−60/hr**. So 50 patients clear in 50/60 hr = **50 min (at 12:50)**.
   - Area = ½ × 1 × 50 (11–12) + ½ × (5/6) × 50 (12–12:50) = 25 + 20.83 = **45.83 patient·hr**
   - Average = 45.83 / 5 = **9.17 patients** (the review says 10)
   - In the exam, use the correct slope and **show the 12:50 empty time**. If you're unsure which answer will be accepted, ask the TA.
2. **SA 1(a):** says "Resource **A** has a capacity rate of 3". It should be **Resource B**. The answer of 3/hr is right.
3. **SA 1(b):** "1/3 = .33 minutes per hour" should be **1/3 hour per unit = 20 minutes per unit**. "Cycle time" (= 1/throughput) is **not defined in the lecture slides**, so learn it from here.
4. **SA 1(e):** the second "If we do **not** rent resource B" should read "If we **rent** resource B".
5. **SA 3:** "a square and a rectangle" should be **a rectangle and a triangle**. The numbers are right.
6. **SA 12(f):** "the standard deviation is 1/48 hours" should be **1/48 days** (= ½ hour). C_S = ½ is correct.
7. **SA 1(g):** says "bottleneck resource is activity B/C". By T/F 12, it should say *resource* B/C.

---

## 6. Exam-day checklist

**Process flow (L2–L3)**
- [ ] List **every** resource, including machines and tools (T/F 11). Add up each resource's unit load over *all* its activities.
- [ ] Pools: capacity = n × individual capacity. A unit does a pooled activity **once** in flow time.
- [ ] Flow time with activities done at the same time = **longest path**.
- [ ] Bottleneck = lowest capacity, i.e. highest unit load per pool member. There can be ties.
- [ ] Throughput = min(input, capacity). Utilization ≤ 100%. Implied utilization can be above 100%.
- [ ] Profit questions: only adding capacity at the bottleneck helps, and the new bottleneck limits the gain. Compare profit/hr = throughput × price − costs.
- [ ] "How much to shorten the bottleneck?" Reduce it until it ties with the **next** bottleneck (watch pools: SA 2(c)).

**Inventory (L3)**
- [ ] Track the queue at the end of each interval: max(0, previous + input − capacity).
- [ ] Continuous: slope = input − capacity. When the queue drains, **find when it hits 0** (SA 8).
- [ ] Average = area ÷ total time. Discrete = sum of snapshots ÷ number of intervals.
- [ ] Little's Law: make I, R and T cover the same part of the process, in the same units.

**Scheduling (L4)**
- [ ] SPT: ascending pᵢ. WSPT: ascending pᵢ/wᵢ. Compute Cᵢ by adding the **actual** pᵢ. Σ Wᵢ = Σ Cᵢ − Σ pᵢ.

**Queues (L4–L5)**
- [ ] Convert everything to one time unit first (often per hour).
- [ ] CV = SD ÷ mean of the *time*. Exponential → 1. Deterministic → 0. A Poisson count implies exponential gaps.
- [ ] ρ = λ/μ (one server) or λ/(cμ) (c servers). Check ρ < 1.
- [ ] Iq from PK. **Is = ρ (one server) or cρ (c servers).** I = Iq + Is.
- [ ] Tq = Iq/λ. T = Tq + 1/μ = I/λ.
- [ ] Several independent queues: add the Iq values. Average time is weighted by arrival share (SA 12(c iv), 12(d)).
- [ ] Merging separate lines into one pooled queue always gives a shorter wait (L5, SA 12(c v)).
- [ ] Queues in series: compute each queue separately and add the Tq values (SA 12(g)).

---

## 7. Formula sheet

| | Formula |
|---|---|
| Capacity rate | (number in pool) × 60 ÷ unit load (min) per hour |
| Throughput | min{input, capacity} |
| Utilization / implied utilization | throughput ÷ capacity / input ÷ capacity |
| Cycle time | 1 ÷ throughput rate |
| Little's Law | I = R × T |
| Average inventory | area under the curve ÷ time (continuous); Σ snapshots ÷ n (discrete) |
| SPT / WSPT | sort by pᵢ / sort by pᵢ/wᵢ; Σ Cᵢ = Σ Wᵢ + Σ pᵢ |
| CV | σ ÷ mean; exponential = 1, deterministic = 0 |
| Exponential(r) | mean = SD = 1/r |
| Poisson(m) | mean = variance = m |
| PK, single server | Iq ≈ ρ²/(1 − ρ) × (C_A² + C_S²)/2, with ρ = λ/μ |
| M/M/1 (exact) | Iq = ρ²/(1 − ρ) = λ²/[μ(μ − λ)] |
| M/D/1 | Iq = ρ²/(1 − ρ) × ½ |
| PK, c servers | Iq ≈ ρ^√(2(c+1))/(1 − ρ) × (C_A² + C_S²)/2, with ρ = λ/(cμ) |
| Times | Tq = Iq/λ; Ts = 1/μ; T = Tq + Ts; Is = λ/μ |

**Exponents to know:** c = 1: √4 = 2. c = 2: √6 ≈ 2.449. c = 3: √8 ≈ 2.828. c = 4: √10 ≈ 3.162. c = 5: √12 ≈ 3.464.

# DOTE 2030 Operations Management — Detailed Notes (Lectures 1–3)

*CUHK Business School, Fall 2026, Instructor: Jiangze (Jay) Han*

---

## Lecture 1: Introduction to Operations Management

### Course logistics
| Component | Weight | Notes |
|---|---|---|
| Homework | 25% | Questions are similar to exam questions. If you do the homework, the exam should hold no surprises. |
| Midterm test | 35% | In class, date to be announced |
| Final test | 40% | |
| Participation | +5% bonus | |

- Instructor: Jiangze (Jay) Han, Room 739, Cheng Yu Tung Building, jiangzehan@cuhk.edu.hk
- TA: Ziling Feng (PhD, MIS), ziling.feng@link.cuhk.edu.hk

### 1. What is Operations Management?

**The product–service spectrum.** A business creates a product, a service, or a mix of both:

```
100% Service ◄──────────────────────────────────────► 100% Product
 Medical exam     Restaurant     (University degree?)     Luxury purchase     Flour
```
Most offerings sit somewhere between the two ends. A restaurant sells both food (a product) and the dining experience (a service).

**Key definitions**
- **Operations**: the set of processes by which products or services are made or created.
- **Operations Management (OM)**: the management (*design, operation and improvement*) of the transformation processes that create value.
- **Logistics**: the flow of the **right** products or services to the **right place**, at the **right time**, and in the **desired condition**.
  - *Delivery*: how do we distribute or transport products and services to different locations?
  - *Quantity*: how many products should we keep on hand or deliver to customers?

**The transformation model**
```
 INPUTS  ──►  Buy  ──►  Make/Create  ──►  Sell  ──►  OUTPUTS
 • Capital                                             • Products
 • Labor                                               • Services
 • Materials
 • Knowledge
 • Equipment
 • Time
 • Facilities
```
**Where OM fits among business functions**
- Finance / Accounting handles **capital** coming in.
- Management handles **labor**.
- Marketing handles **selling**.
- **Logistics and Operations Management** handles the whole Buy → Make → Sell chain.

### 2. How do we analyze and improve operations? (the 3-step framework)
1. **Identify the process.** What are the steps?
2. **Decide the measures.** What do we want to improve?
3. **Identify the best design.** What is the efficient frontier?

**Process**: a collection of steps that transforms input into output.
- It may consist of sub-processes.
- How detailed it should be depends on the question being asked.
- There is no single correct process map.

*Example (Overcooked tomato pasta):*
```
Order arrives ─┬─► Take out pasta ─► Boil pasta ───────────────────┐
               └─► Take out tomato ─► Chop tomato ─► Cook tomato ──┴─► Put together ─► Serve customers
```

**What can we measure?** (We must measure a process to manage or improve it.)
- **Efficiency**: how easily do we turn input into output?
- **Utilization**: how effectively are we using capacity?
- **Quality**: how well made are the products (defect rate, service level, …)?
- **Environmental impact**: how much pollution does the process create?

**Efficient frontier (Amazon delivery example).** There are two objectives that conflict: **delivery speed** and **profit**.
- Shipping every order by air or private driver gives high speed and low profit.
- Shipping by land only once enough orders from the same area have built up gives high profit and low speed.
- The **efficient frontier** is the set of designs where you cannot improve one objective without hurting the other. Good designs lie on the frontier. Designs inside it are dominated.

### 3. What will we do in this course?
| Topic | Question | Content |
|---|---|---|
| **Process (flow) analysis** | How can we identify, measure and improve processes? | Map a process, find bottlenecks, compute flow time, capacity, utilization, inventory and Little's Law, assign resources |
| **Queueing analysis** | How do we analyze random variation in a process? | Waiting times, arranging servers, how randomness affects output |
| **Inventory management** | How much input should we order? | Order quantity, when to reorder, cost of stocking out vs. over-ordering |
| **Forecasting** | | Predicting future quantities from past data, trends, AI |
| **Supply chain management** | How do companies interact? | Entities in a supply chain, disruptions, information sharing, the Beer Game |

### 4. Societal impact of OM
Effective operations are essential for businesses **and** public-sector systems.

**Uber, a real-time two-sided marketplace**
- Riders provide request time and location, destination, and willingness to wait or pay.
- Drivers provide location and availability, expected trip value, acceptance and vehicle.
- The platform **MATCHES** riders to drivers and sets the **PRICE**.
- Goal: build a *reliable market*, not just the nearest match or the lowest price. Each party measures success differently: riders by pickup time and reliability, drivers by utilization and earnings, the platform by completed trips and margin.

*Matching: optimize the whole system, not one request at a time.*

| Pickup time (min) | D1 | D2 |
|---|---|---|
| R1 | 2 | 4 |
| R2 | 3 | 9 |

- **Greedy** (each rider gets the closest driver right away): R1→D1 (2) + R2→D2 (9) = **11 min**
- **Batched / system-wide**: R1→D2 (4) + R2→D1 (3) = **7 min**
- The closest driver is not always the best assignment for the system.

*Dynamic pricing as a feedback loop.* A demand shock (rain, a concert, rush hour) leads to more requests than available drivers. The platform raises prices and driver incentives. Riders respond by accepting, waiting or switching mode. Drivers respond by coming online, staying longer or repositioning.
- Benefit: reliability and trip completion. Economic logic: scarce capacity goes to those who value it most. Management risk: affordability, fairness and trust.
- **Dynamic pricing manages scarcity. It does not eliminate it.**

**Amazon: the delivery promise is an operations decision**
1. *Before the order*: forecast demand, buy inventory, position stock.
2. *At checkout*: choose the fulfillment node, quote a delivery promise, reserve capacity.
3. *After the order*: pick and pack, sort and transport, route the last mile.
- Scale: millions of products × many facilities × uncertain demand and capacity. Amazon trades off availability, speed, cost and resilience.

*Inventory placement (10,000 swimsuits):*
- **One large warehouse**: any region can draw on the same stock (pooling), but some orders travel farther.
- **Several local warehouses** (e.g., 3,000 / 4,000 / 3,000): stock starts closer to customers, but a wrong forecast can leave too much in one region and none in another.
- Decision: how many units go to each location *before* demand is known?

**Social good: public housing (UN SDG for safe, affordable housing)**
- The Public Housing Authority (PHA) manages many units of different types and rents them at low prices (e.g., rent is 30% of income, with a minimum based on household size).
- There are two types of requests: **move-in** requests from outside applicants, and **transfer** requests from current tenants (medical need, commute too long, social conflict, …). Both have long waits.
- HK public rental housing median wait (2024): 1 person (elderly) 3–4 years; 2 persons 4–5 years; 3+ persons more than 6 years.
- **Transfer cycle**: transfer requests that form a cycle (A wants B's type, B wants C's type, C wants A's type) can all be fulfilled at once **even with no vacant units**. A good policy finds and executes such cycles quickly.

**Foundations behind these applications:** process flow analysis, queueing analysis, inventory management and forecasting.

---

## Lecture 2: Process Flow Analysis I

### Key steps in process flow analysis
1. **Map the process**: flow units, activities and their order, resources and how much they are used. Visualize with a flow chart or Gantt chart.
2. **Decide the measures**: capacity rate, unit load, throughput rate, utilization, implied utilization.
3. **Improve the process**: e.g., resource pooling, reassigning work.

### 1. Process mapping

**Main components**
| Component | Meaning |
|---|---|
| **Flow units** | Items that flow through the process (homogeneous or heterogeneous) |
| **Activities** | Transformation steps. Each takes time. |
| **Resources** | Perform activities and have limited capacity |
| **Buffers** | Queues where flow units wait |
| **Decision points** | Points that send flow to one of several activities depending on a decision |

**Examples**
| | HKG security screening | Restaurant |
|---|---|---|
| Flow unit | Passenger | Customer order |
| Activities | Prepare for screening, screening, repack | Receive order, prepare food, bring food, receive payment |
| Resources | Security officer, scanner | Waiter, chef, payment terminal |
| Buffer | Passengers waiting to be screened | Orders waiting to be prepared |
| Decision point | Does the passenger have pre-check status? | Does the customer want dessert? |

**Flow-chart symbols**: rectangle = activity; triangle = buffer; diamond = decision point; arrow = direction of flow.
- Each activity is done by one or more resources (e.g., *Boil pasta* uses the Chef and a Pot). One resource may perform several activities.
- With a decision point, e.g., "Meat or mushroom?", the flow splits into parallel paths: Take out meat → Chop → Cook, or Take out mushroom → Chop → Cook. Both paths then join at "Put together".

**Good mapping practice**
- There is no single correct way to draw a process map. A good map shows everything needed to analyze performance.
- Validate it with the people involved. Map the process **as it actually works**, not as you think it works.

**Basic model used in Lecture 2:** ignore buffers and decision points, use one type of flow unit, and put all activities on a single path. (Real processes can have parallel paths, several types of flow units, and buffers.)

### 2. The running example: McDonald's burger

| Activity | Place order | Toast buns | Add dressings | Add meat patties | Package | Deliver |
|---|---|---|---|---|---|---|
| Resource | Cashier | Worker 1 + Toaster | Worker 2 | Worker 3 | Worker 4 | Worker 5 |
| Time | 8 s | 10 s | 8 s | 6 s | 2 s | 2 s |
| Capacity rate | 450/hr | **360/hr** | 450/hr | 600/hr | 1800/hr | 1800/hr |

#### Flow time
- **(Theoretical) flow time of an activity**: the shortest time for one flow unit to complete that activity.
- **(Theoretical) flow time of a process**: the shortest time for one flow unit to complete the whole process. For a single path, it is the **sum of activity times along the path**.
  - McDonald's: 8 + 10 + 8 + 6 + 2 + 2 = **36 s**
- **Actual flow time is not always equal to theoretical flow time.** Random delays (e.g., the cashier hits the wrong button) can make it longer. Lecture 2 uses theoretical flow time only.

**Gantt chart**: shows each resource/activity as a bar on a time axis. It shows that the cashier can start the **next order before the current burger finishes**, so the process works on several units at once.

> **Common mistake:** "Flow time is 36 s, so capacity = 3600/36 = 100 burgers/hr." **Wrong!** Several orders are in progress at the same time.

#### Capacity rate
- **Capacity rate of a resource**: the maximum number of units the resource can process in a given time.
  - Capacity rate = (number of resource units) × (time available) ÷ (unit load)
  - Toaster: 10 s per order → 0.1 orders/s = 6 orders/min = **360 orders/hr**
- **Capacity rate of a process**: the maximum number of units the process can complete in a given time.
- **Bottleneck**: the resource with the **lowest capacity rate**, which equals the **highest unit load**.
  - **Process capacity rate = capacity rate of the bottleneck = min over all resources.**
  - McDonald's: min(450, 360, 450, 600, 1800, 1800) = **360 burgers/hr**. The bottleneck is Worker 1 + Toaster.

### 3. Improving capacity: resource pooling
- To raise process capacity, you **must** raise the capacity of the bottleneck.
- **Resource pool**: a collection of interchangeable resources that perform the same set of activities. The pool's capacity is (number of units) × (capacity of one unit).

**Case A: hire a second cashier**
- Cashier pool: 2 × 450 = 900/hr.
- Flow time is **still 36 s**, because each order is placed only once.
- Process capacity is **still 360/hr**. The cashier was not the bottleneck, so nothing improves.

**Case B: add a second toaster** (Worker 1 can manage both)
- Toaster pool: 2 × 360 = 720/hr.
- New capacity = min(450, 720, 450, 600, 1800, 1800) = **450/hr**.
- The new bottlenecks are **the Cashier and Worker 2** (tied). Fixing one bottleneck can create another.

### 4. Unit load: improving without new resources
- **Unit load of a resource**: the total time the resource spends on one flow unit, summed over **all activities it performs**.
- **Unit load = 1 / capacity rate.**

*Reassignment:* Worker 3 does patties (6 s), packaging (2 s) and delivery (2 s). Worker 3's unit load = 10 s, so capacity = 360/hr. The process capacity stays at **360/hr** while Workers 4 and 5 are freed up.

**Unit load ↔ capacity table (completed)**
| Resource | Unit load (min/unit) | Capacity rate (units/min) |
|---|---|---|
| Cashier | 8/60 = 2/15 | 7.5 |
| Toaster | 10/60 = 1/6 | 6 |
| Worker 1 | 10/60 = 1/6 | 6 |
| Worker 2 | 8/60 = 2/15 | 7.5 |
| Worker 3 (patties + package + deliver) | 10/60 = 1/6 | 6 |

**Characteristics of bottlenecks**
- The bottleneck has the **highest unit load** (lowest capacity).
- Shortening tasks that are **not** on the bottleneck **reduces flow time but not capacity**.
- Raising the capacity of one bottleneck may create another bottleneck.
- Ways to relieve a bottleneck: **reduce its unit load** (reassign or speed up tasks), or **expand its resource pool** (e.g., add a toaster).

### 5. Other process measures

**Throughput rate**
```
Input rate ──► [ Process (capacity rate) ] ──► Output rate
```
- So far we assumed unlimited input. In reality, input (demand) is limited.
- **Throughput rate** = the actual number of units that go through the process per unit time:

  > **Throughput rate = min{ Capacity rate, Input rate }**

- Toaster with 4 slots/min: 2 pieces of bread/min gives 2 toast/min. 10 pieces of bread/min gives 4 toast/min.

**Utilization**
> **Utilization (of a resource) = Throughput rate (of the process) ÷ Capacity rate (of the resource)**

- Always **≤ 100%**. It measures how well a resource is used. If it is below 100%, the resource has excess capacity.
- The bottleneck has the **highest** utilization.
- Toaster with 2 pieces of bread and 4 slots: 50%.
- **All resources below 100%**: the process is **demand-limited** (input rate < process capacity).
- **Some resource at 100%**: that resource is the bottleneck. There are two cases:
  1. Input rate > process capacity: the process is **capacity-limited**.
  2. Input rate = process capacity: supply exactly matches demand.
  - Utilization cannot tell these two cases apart, which is why we need implied utilization.

**Implied utilization**
> **Implied utilization (of a resource) = Input rate (of the process) ÷ Capacity rate (of the resource)**

- It **can exceed 100%**. It shows how much demand the resource is being asked to handle.
- Above 100% means the resource **cannot keep up** with current demand. For example, 200% for a chef means the chef would have to work twice as fast as possible to meet demand.

### 6. Application: Amazon robotic fulfillment (Kiva, acquired 2012)
- **Traditional picker-to-parts**: the order enters the software, the system assigns a picker a list and a route, the picker pushes a cart through the aisles scanning items into totes, and drops totes off for packing. **Workers travel to inventory.**
- **Robotic fulfillment**: items sit in movable shelves (**pods**). Flat robots (drive units) lift pods and bring them to **pick stations**. **Inventory travels to workers.**
- Decisions after an order arrives: (1) which pod supplies each item, (2) which orders share a trip, (3) which robot and route moves the pod.
- Process: receive order → locate inventory → build work plan → dispatch robot → deliver to station (associate picks and scans) → return pod and continue. Throughput = completed picks per hour.
- **Fleet size and congestion**:
  - Too few robots: pickers wait for pods.
  - Too many robots: robots block each other.
  - Adding a robot has a **capacity effect** (+, one more pod moved) and a **congestion effect** (−, more traffic and detours). At high density, throughput can plateau or **fall**.
  - **Throughput need not increase monotonically with the number of robots.** More resources raise nominal capacity, but congestion can reduce effective capacity.
- **Shortest route ≠ best for the system.** Many short paths converge on a hotspot. Sending one robot on a longer route can reduce total delay.
- **Amazon's congestion-aware planning**: observe historical locations → anticipate planned trajectories → predict delay by grid cell and time → re-route with the predicted delay added to path costs. Result: **+4.4% average throughput**.

### 7. In-class exercise (Lecture 2)
```
Start ─► [Queue] ─┬─► Activity A (Worker 1, 10 min) ─┬─► B (W3, 5) ─► C (W3, 2) ─► D (W3, 3) ─► E (W4, 5) ─► End
                  └─► Activity A (Worker 2, 10 min) ─┘
```
Workers 1 and 2 form a **resource pool** because both perform Activity A.

1. **Capacity of the pool:** Worker 1 unit load = 10 min, so capacity = 60/10 = 6 units/hr. Pool = 2 × 6 = **12 units/hr**.
2. **Theoretical flow time:** A + B + C + D + E = 10 + 5 + 2 + 3 + 5 = **25 min**. Each unit passes through A only **once**, so don't double count the parallel A.
3. **Pool utilization at throughput 3/hr:** 3/12 = **25%**.
4. **Bottleneck and process capacity:**
   - Pool: 12/hr
   - Worker 3: unit load = 5 + 2 + 3 = 10 min, so 60/10 = **6/hr**
   - Worker 4: unit load = 5 min, so 12/hr
   - **Bottleneck = Worker 3. Process capacity = 6 units/hr.**

---

## Lecture 3: Process Flow Analysis II: Inventory Analysis

### Recap
Process mapping; bottleneck and process capacity; unit load, input rate, throughput and utilization; increasing capacity by resource pooling.

### 1. Resource allocation: the Overcooked pizza
Can we raise process capacity **without adding resources**? Yes, by **allocating** work better.

**Setup**: one tomato-cheese pizza per order. Shared equipment: 2 cutting boards, 1 oven, 1 wash station. 2 players (chefs). 4 plates.

| # | Activity | Time | Equipment |
|---|---|---|---|
| 1–3 | Bring dough, prepare dough, move to assembly | 1 + 3 + 1 = 5 s | Board |
| 4–6 | Bring tomato, chop, move | 1 + 3 + 1 = 5 s | Board |
| 7–9 | Bring cheese, chop, move | 0.5 + 3 + 0.5 = 4 s | Board |
| 10 | Assemble raw pizza | 1 s | |
| 11 | Load into oven | 1 s | Oven |
| 12 | Bake (**no chef needed**) | 10 s | Oven |
| 13 | Unload onto clean plate | 1 s | Oven |
| 14 | Carry and serve | 2 s | |
| 15 | Wash returned plate | 3 s | Wash station |

**Step 1: equipment gives an upper bound.** Capacity = units × 60 ÷ unit load.
| Equipment | Units | Unit load (s/pizza) | Capacity (pizzas/min) |
|---|---|---|---|
| Boards (chopping only) | 2 | 3 + 3 + 3 = 9 | 2 × 60/9 = 13.33 |
| Oven (load + bake + unload) | 1 | 1 + 10 + 1 = 12 | 60/12 = **5.00** |
| Wash station | 1 | 3 | 20.00 |

Process capacity ≤ **5 pizzas/min**. **No assignment of players can beat the oven.**

**Total manual work per pizza** = 5 + 5 + 4 + 1 + 1 + 1 + 2 + 3 = **22 s**.

**Design 1: prep chef plus service chef**
- Chef A does all prep (dough, tomato, cheese): 5 + 5 + 4 = 14 s, so 60/14 = **4.29/min**.
- Chef B does assemble, load, unload, serve and wash: 1 + 1 + 1 + 2 + 3 = 8 s, so 7.5/min.
- Process capacity = min(4.29, 7.50, 5.00) = **4.29/min**. Chef A is the bottleneck, and Chef B has idle time.

**Design 2: balanced work**
- Chef A does dough, tomato, assemble and load: 5 + 5 + 1 + 1 = 12 s, so **5.00/min**.
- Chef B does cheese, unload, serve and wash: 4 + 1 + 2 + 3 = 10 s, so 6.00/min. Chef B can prep cheese for the next pizza while the current one bakes.
- Process capacity = min(5, 6, 5) = **5/min**. Chef A and the oven are both bottlenecks.
- Total manual work is still 22 s. A's unit load drops from 14 to 12 s, raising capacity by **16.7%**.

**Design 3: full pooling** (either player can do any task; assign ready tasks to whichever player is free)
- Player pool capacity = 2 × 60/22 = 5.45/min.
- Process capacity = min(5.45, 5.00) = **5/min**. The oven is the bottleneck.

| Design | Player loads | Capacity | Bottleneck |
|---|---|---|---|
| 1 Prep / service | A 14, B 8 | 4.29 | Chef A |
| 2 Balanced | A 12, B 10 | 5.00 | Chef A + oven |
| 3 Full pooling | Pool 22 | 5.00 | Oven |

**Insights**
1. The bottleneck limits capacity. The oven's 5/min cannot be raised by reassigning players.
2. Reassignment can reduce the bottleneck's unit load. Balancing raised capacity from 4.29 to 5.
3. Full pooling allows the optimal allocation. Here a well-balanced fixed assignment is just as good.

**Ways to relieve a bottleneck:** expand the resource pool of the bottleneck, or reduce its unit load.

### 2. Inventory buildup

**Definitions**
- **Inventory in a buffer**: all flow units waiting in the buffer.
- **Inventory in an activity**: all flow units currently being worked on.
- **Inventory in the process**: all flow units anywhere in the process (buffers plus activities).

*Example:* Order placed (0) → Prep (1 pizza) → Buffer (3 pizzas) → Bake (1 pizza)
- Buffer inventory = 3. Activity inventory = 1 + 1 = 2. **Process inventory = 5.**

#### Airport screening example (6:00–10:00 a.m., capacity 15 passengers per 15-minute slot, initial queue 0)
**Recurrence:** Queue(end of slot) = max{0, Queue(previous) + Input − Capacity}

| Slot end | Input | Capacity | Excess demand | Excess capacity | Queue |
|---|---|---|---|---|---|
| 6:15 | 7 | 15 | 0 | 8 | 0 |
| 6:30 | 10 | 15 | 0 | 5 | 0 |
| 6:45 | 8 | 15 | 0 | 7 | 0 |
| 7:00 | 12 | 15 | 0 | 3 | 0 |
| 7:15 | 9 | 15 | 0 | 6 | 0 |
| 7:30 | 16 | 15 | 1 | 0 | **1** |
| 7:45 | 14 | 15 | 0 | 1 | 0 |
| 8:00 | 19 | 15 | 4 | 0 | **4** |
| 8:15 | 22 | 15 | 7 | 0 | **11** |
| 8:30 | 17 | 15 | 2 | 0 | **13** |
| 8:45 | 13 | 15 | 0 | 2 | **11** |
| 9:00 | 11 | 15 | 0 | 4 | **7** |
| 9:15 | 12 | 15 | 0 | 3 | **4** |
| 9:30 | 8 | 15 | 0 | 7 | 0 |
| 9:45 | 10 | 15 | 0 | 5 | 0 |
| 10:00 | 7 | 15 | 0 | 8 | 0 |
| **Total** | **195** | **240** | | | |

- Total capacity (240) exceeds total demand (195), **but a queue still forms**, because short-run demand exceeds capacity in some slots. **Enough total capacity does not guarantee no queue.**
- Average inventory from discrete snapshots = (1 + 4 + 11 + 13 + 11 + 7 + 4)/16 = 51/16 = **3.19 passengers**.

#### Stable process
- The input rate may vary over time. Both short-run and long-run averages matter.
- If the **long-run** average input rate > capacity, the queue grows to infinity.
- **Stable process**: long-run average input rate ≤ capacity rate. Inventory then does not grow without bound.
- The **short-run** input rate can still exceed capacity, so queues can build temporarily.

#### Example: inventory buildup diagrams (capacity 100 customers/hr, 10 AM–6 PM)
| Period | Input/hr | Capacity/hr | Buildup rate | Output/hr |
|---|---|---|---|---|
| 10 AM–12 PM | 50 | 100 | 0 (no queue) | 50 |
| 12 PM–2 PM | 200 | 100 | **+100/hr** | 100 |
| 2 PM–6 PM | 50 | 100 | **−50/hr** | 100 |

- The queue rises from 0 at 12 PM to **200** at 2 PM, then falls to 0 at 6 PM.
- **Inventory buildup rate** = slope of the inventory curve = input rate − output rate (while a queue exists).

**Discrete diagram** (snapshot at the end of each hour, 11:00 to 18:00): 0, 0, 100, 200, 150, 100, 50, 0
> Average inventory = (0 + 0 + 100 + 200 + 150 + 100 + 50 + 0)/8 = **75**

**Continuous diagram** (area under the curve):
> Area = ½·2·200 + ½·4·200 = 200 + 400 = 600 customer·hrs. Average inventory = 600/8 = **75 customers**

**Average throughput** = (2 × 50 + 6 × 100)/8 = 700/8 = **87.5 per hour**.

#### Summary: discrete vs. continuous averages
Initial inventory 0. Week 1: rises steadily by 20 (to 20). Week 2: rises by another 30 (to 50).
- **Discrete** (end-of-week snapshots): (20 + 50)/2 = **35 units**
- **Continuous** (area under the line): triangle A = ½·1·20 = 10, rectangle C = 1·20 = 20, triangle B = ½·1·30 = 15. Total 45, so average = 45/2 = **22.5 units**

> The two methods can give **different** answers. Use the one that matches the question (snapshots vs. continuous tracking).

### 3. Little's Law

Three averages for any process:
- **I**: average inventory, i.e., how many units are in the process on average
- **R**: average throughput rate, i.e., how many units leave per unit of time
- **T**: average flow time, i.e., how long a unit spends in the process

> ## Little's Law: **I = R × T**
> (Average inventory = average throughput rate × average flow time)

Watch the units: I [units] = R [units/time] × T [time].

**BBA students example**, the three ways to use it:
- Q1, find I: 850 graduate/yr, 4 years each, so I = 850 × 4 = **3,400 students**
- Q2, find R: 3,500 students, 4 years each, so R = 3500/4 = **875 graduates/yr**
- Q3, find T: 3,600 students, 800 graduate/yr, so T = 3600/800 = **4.5 years**

**Airport queue, average waiting time** (using the 10 AM–6 PM example)
- I_q = 75 passengers. Passengers served = 6 × 50 + 2 × 200 = 700, so R = 700/8 = 87.5/hr.
- T_q = I_q / R = 75/87.5 hr = **51.4 min**

**Heathrow security (real-world application)**
- Heathrow Airport Limited (HAL) measures and reports queue times and plans lanes and staffing. The CAA regulator sets standards, and poor performance can trigger rebates to airlines. Grant Thornton audited the measurements in 2016.
- Timing each person directly requires matching each passenger's entry and exit records (CCTV, Bluetooth). **Counting** people in and out avoids that matching.
- Automatic Queue Measurement (AQM) is an application of Little's Law. At T2 central security, entries were counted at ticket scans and exits at metal detectors.
  - People inside = initial number + entries − exits
  - I = time-average of the number inside. R = exits ÷ elapsed time. **T = I/R.**
- The system supported lane-opening and staffing decisions, and managers checked daily results for anomalies.

**Uber: Little's Law for busy drivers** (Yan et al., 2020)
- A fleet of L drivers, of whom O are open (available). Driver states: open → en route to pickup → on trip.
- Flow unit: one driver assignment, from dispatch to drop-off.
  - I = L − O busy drivers
  - R = Y completed trips per minute
  - T = η + T_trip (pickup time + ride time)
- So **L − O = Y(η + T)**, which gives L = O + ηY + TY and **Y = (L − O)/(η + T)**.
- Insight: for a fixed fleet, shorter pickup times η give more trips per minute.

### 4. Case study: Shouldice Hospital (hernia repair, Canada)

**Process**: Patient → Pre-surgery preparation (1 night, 1 bed) → Surgery (1 night, 1 bed + 1 surgeon + 1 OR) → Recovery (1 night, 1 bed) → Healthy individual

**Assumptions**
- Admits 30 patients/day, **Sunday to Thursday**. No admissions Friday or Saturday.
- Each patient stays **exactly 3 nights**. Surgery is on the 2nd day. No surgery on Saturday or Sunday.
- 12 surgeons, each doing 4 patients/day. Each operation takes 1 hr in an OR.
- 5 ORs, each available 8 hrs/day. **90 beds.** Other resources (nurses, staff) are not limiting.
- Flow unit = 1 patient. Flow time = 3 days.

**Capacity rate (per week)**
| Resource | Calculation | Capacity (patients/week) |
|---|---|---|
| Beds | 90 beds × 7 days ÷ 3 days per patient | **210** |
| Surgeons | 12 × 4/day × 5 days | **240** |
| ORs | 5 × 8 hr × 5 days ÷ 1 hr | **200** |

Process capacity = min = **200 patients/week**. **ORs are the bottleneck.**

**Daily constraints**: beds ≤ 90 patients/night; surgeons ≤ 48 operations/day; ORs ≤ 40 operations/day.

**Current operation**
- Throughput R = 5 × 30 = **150 patients/week**.
- Overnight occupancy: Sun 30, Mon 60, Tue 90, Wed 90, Thu 90, Fri 60, Sat 30.
- Average inventory = (30×2 + 60×2 + 90×3)/7 = 450/7 ≈ **64 patients**.
- Check with Little's Law: I = R × T = 150 × (3/7 week) ≈ **64** ✓

**Goal: 180 patients/week (+30).** Options considered:

| Plan | Admissions (Sun–Fri) | Ops/day | Peak beds | Feasible? |
|---|---|---|---|---|
| **Saturday surgery** | 30 each day Sun–Fri | 30 (Mon–Sat) | 90 | **Yes**, but surgeons don't want to work Saturdays |
| **Option 1:** +6 every day | 36 Sun–Thu | 36 | **108** | Needs 18 more beds |
| **Option 2:** 40/40/20/40/40 | 40 Sun, 40 Mon, 20 Tue, 40 Wed, 40 Thu | 40, 40, 20, 40, 40 | **100** | Needs 10 more beds |
| **Option 3:** 45/45/0/45/45 | none on Tue | 45 on busy days | 90 | Beds OK, but 45 > 40 OR limit, so **needs 1 more OR** (6 × 8 = 48/day) |

**Partner exercise: best possible with no new resources and weekday surgery only**
- Feasible improvement: admissions 40, 30, 20, 40, 30 gives **160/week** (peak 90 beds, every surgery day ≤ 40).
- **Optimal: admissions 40, 40, 10, 40, 40 gives 170/week.** Overnight occupancy: 40, 80, 90, 90, 90, 80, 40.

**Why 170 is optimal (integer programming argument)**

Let x₁…x₅ = surgeries Mon–Fri.
- Maximize S = x₁ + x₂ + x₃ + x₄ + x₅
- OR limit: 0 ≤ xᵢ ≤ 40 (tighter than the surgeon limit of 48)
- Bed limits (each night, three surgery cohorts overlap):
  - Tue night: x₁ + x₂ + x₃ ≤ 90
  - Wed night: x₂ + x₃ + x₄ ≤ 90
  - Thu night: x₃ + x₄ + x₅ ≤ 90
- Bound: S = x₁ + (x₂ + x₃ + x₄) + x₅ ≤ 40 + 90 + 40 = **170**, and the schedule (40, 40, 10, 40, 40) reaches it. **Rescheduling alone cannot exceed 170.**

**What reaches 180/week?**
| Option | Requirement |
|---|---|
| Saturday surgery | One extra operating day |
| Weekday surgery, current OR hours | 100 beds (10 more beds) |
| Weekday surgery, current beds | 45 operations on busy days, so 1 more OR |

---

## Formula sheet (Lectures 2–3)

| Measure | Formula |
|---|---|
| Theoretical flow time (single path) | Sum of activity times along the path (count parallel pooled activities once) |
| Unit load of a resource | Total time the resource spends per flow unit (sum over all its activities) |
| Capacity rate of a resource | (# units in pool) × (time available) ÷ unit load = 1/unit load per unit |
| Process capacity rate | min over resources of capacity rate (the bottleneck's capacity) |
| Bottleneck | Resource with the lowest capacity, i.e., the highest unit load per pooled unit |
| Throughput rate | min{capacity rate, input rate} |
| Utilization | Throughput rate ÷ resource capacity rate (≤ 100%) |
| Implied utilization | Input rate ÷ resource capacity rate (can exceed 100%) |
| Inventory buildup rate | Input rate − output rate |
| Discrete average inventory | Sum of snapshots ÷ number of snapshots |
| Continuous average inventory | Area under the inventory curve ÷ length of the time period |
| Stability | Long-run average input rate ≤ capacity rate |
| **Little's Law** | **I = R × T** |

## Key takeaways
1. Capacity is set by the **bottleneck**, not by flow time. Never compute capacity as 1/flow time.
2. Speeding up non-bottleneck tasks shortens flow time but does not raise capacity.
3. Fixing one bottleneck can move the bottleneck elsewhere.
4. You can raise capacity **without new resources** by reassigning work (balancing unit loads) or pooling. You still cannot exceed the equipment's upper bound.
5. Enough *total* capacity does not mean *no queue*. Queues form whenever short-run demand exceeds capacity.
6. Little's Law links inventory, throughput and flow time. Know any two and you get the third. It works for students, passengers, drivers, patients, and so on.
7. Scheduling (e.g., Shouldice admissions) can raise throughput, but only up to the limit set by the binding constraints.

*Next lecture: Queueing Analysis I.*

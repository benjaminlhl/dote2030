# DOTE 2030 — Homework 1: Process Flow Analysis (Solutions)

*Units are included and final answers are rounded to two decimal places. The process is assumed stable, so Little's Law applies.*

---

## Question 1 — Flow time of the process [1 pt]

The (theoretical) flow time of a process is the shortest amount of time needed for one flow unit to complete the process (Lecture 2). In the McDonald's example, all activities were on one path, so the flow time was just the sum of the activity times.

Here B and C are performed **simultaneously**, and so are E and F. A flow unit can only start D once **both** B and C are finished, and can only start G once **both** E and F are finished. So we add up the times along each path from START to END:

| Path | Time |
|---|---|
| A → B → D → E → G | 5 + 3 + 2 + 5 + 3 = 18 min |
| A → B → D → F → G | 5 + 3 + 2 + 7 + 3 = 20 min |
| A → C → D → E → G | 5 + 5 + 2 + 5 + 3 = 20 min |
| A → C → D → F → G | 5 + 5 + 2 + 7 + 3 = **22 min** |

The unit is not done until every activity on every path is finished, so the flow time is set by the **longest path**: A → C → D → F → G.

(The parallel activities also don't compete for the same resource: B uses R1, R3 while C uses R2, and E uses R2, R3 while F uses R4. So they really can run at the same time.)

**Flow time = 5 + 5 + 2 + 7 + 3 = 22.00 min**

---

## Question 2 — Open-pit mining (Little's Law: I = R × T) [6 pts]

### (a) [3 pts]
- Flow time T = 10 min = 10/60 hr = 1/6 hr
- Throughput rate R = 12 rocks/hr

I = R × T = 12 rocks/hr × (1/6) hr = **2.00 rocks**

### (b) [3 pts]
- The inventory in the process counts flow units in the buffer **and** in the activity (Lecture 3):
  I = 4 + 1 = 5 rocks
- Flow time T = 20 min

R = I / T = 5 rocks / 20 min = **0.25 rocks/min**

---

## Question 3 — Movie theater line (continuous inventory build-up diagram) [5 pts]

**Inventory over time:**
- 12–2 p.m.: the line grows at +20 people/hr, from 0 to 20 × 2 = **40 people**
- 2–4 p.m.: the line stays at **40 people**
- 4–5 p.m.: the line shrinks at −20 people/hr, from 40 to 40 − 20 × 1 = **20 people**

```
People
 40 |        __________
    |      /            \
 20 |    /               |
    |  /                 |
  0 |/___________________|____
    12    1    2    3    4    5   (p.m.)
```

![Q3 continuous inventory build-up diagram](q3_inventory_buildup.png)

**Area under the curve:**
| Period | Shape | Area |
|---|---|---|
| 12–2 p.m. | Triangle: ½ × 2 hr × 40 | 40 people·hr |
| 2–4 p.m. | Rectangle: 2 hr × 40 | 80 people·hr |
| 4–5 p.m. | Rectangle 1 hr × 20 + triangle ½ × 1 hr × 20 (= trapezoid ½ × (40 + 20) × 1) | 20 + 10 = 30 people·hr |
| **Total** | | **150 people·hr** |

Average inventory = area ÷ length of the time period = 150 people·hr ÷ 5 hr = **30.00 people**

---

## Question 4 — Car manufacturing [10 pts]

**Unit loads and capacity rates (original process).** The unit load of a resource is the total time it spends on one flow unit across *all* activities it performs, and capacity rate = 60 ÷ unit load (Lecture 2).

| Resource | Activities | Unit load (min/car) | Capacity rate (cars/hr) |
|---|---|---|---|
| Saw | Cut metal | 30 | 60/30 = 2.00 |
| Employee 1 | Assemble body + Install engine | 40 + 10 = 50 | 60/50 = 1.20 |
| Crane | Install engine | 10 | 60/10 = 6.00 |
| Employee 2 | Quality assurance | 60 | 60/60 = 1.00 |

### (a) [2 pts]
The bottleneck is the resource with the lowest capacity rate (highest unit load).

**Bottleneck: Employee 2**, with a capacity of 1.00 car/hr. The process capacity is 1.00 car/hr.

### (b) [3 pts]
Employees 2 and 3 now form a **resource pool** for quality assurance, so the pool's capacity is 2 × 1.00 = 2.00 cars/hr.

| Resource | Capacity rate (cars/hr) |
|---|---|
| Saw | 2.00 |
| Employee 1 | 1.20 |
| Crane | 6.00 |
| Employee 2 + Employee 3 (pool) | 2.00 |

**Bottleneck: Employee 1**, with a capacity of 1.20 cars/hr. Fixing one bottleneck created another.

### (c) [5 pts]
For the bottleneck to have a capacity of 2 cars/hr, **every** resource must have a capacity ≥ 2 cars/hr. That means every unit load must be ≤ 60/2 = **30 min/car**.

- **Saw:** 30 min, which is exactly 2 cars/hr. ✓ No investment needed (and none is possible).
- **Crane:** 10 min. ✓
- **Employee 2:** QA must go from 60 → 30 min, a reduction of **30 min**, costing 30 × $10 = **$300**.
- **Employee 1:** the unit load is assemble + 10 (the engine time can't be reduced) ≤ 30, so assemble ≤ 20 min. It must go from 40 → 20 min, a reduction of **20 min**, costing 20 × $10 = **$200**.

After investing, the unit loads are Saw 30, Employee 1 20 + 10 = 30, Crane 10 and Employee 2 30. The bottleneck capacity is 60/30 = 2 cars/hr (Saw, Employee 1 and Employee 2 tie). Any smaller investment leaves Employee 1 or Employee 2 above 30 min, so below 2 cars/hr.

**Minimum investment = $300 + $200 = $500.00**

---

## Question 5 — Unit load and capacity [4 pts]

### (a) [3 pts]
Each resource's unit load is the sum of the times of all activities it is required for:
- R1: A + B = 6 + 2 = 8 min
- R2: B + C = 2 + 4 = 6 min
- R3: D = 4 min

| Resource | Unit Load (min/unit) | Capacity Rate (units/hr) |
|---|---|---|
| R1 | 8 | 60/8 = **7.50** |
| R2 | 6 | 60/6 = **10.00** |
| R3 | 4 | 60/4 = **15.00** |

### (b) [1 pt]
- Process capacity = min(7.50, 10.00, 15.00) = 7.50 units/hr, with R1 as the bottleneck
- Throughput rate = min{capacity rate, input rate} = min{7.50, 2} = 2 units/hr
- Utilization of R2 = throughput rate ÷ capacity rate of R2 = 2 ÷ 10 = **20.00%**

---

## Lecture sources

PDF page numbers. L3 pages are from the solution version, with the non-solution version in brackets.

| Q | Concept used | Source |
|---|---|---|
| 1 | Definition of the (theoretical) flow time of a process | L2 p.19 |
| 1 | Flow time = sum of activity times along the path (McDonald's, 36 sec) | L2 p.20 |
| 1 | Pooled parallel activity counted only once ("do not double count A") | In-class exercise p.3 |
| 2a, 2b | Little's Law, I = R × T | L3 p.37 (p.27) |
| 2a, 2b | Solving for I, R or T (BBA students) | L3 p.32–36 (p.22–26) |
| 2b | Inventory in the process = buffer + activities | L3 p.15 (p.6) |
| 3 | Inventory buildup rate = slope of the graph | L3 p.26 (p.17) |
| 3 | Average inventory = area under the curve ÷ length of time | L3 p.25 (p.16) |
| 3 | Splitting the area into triangles and rectangles (A + B + C) | L3 p.28–29 (p.19) |
| 4a | Capacity rate of a resource | L2 p.25 |
| 4a | Bottleneck = resource with the lowest capacity rate | L2 p.29 |
| 4a, 5a | Unit load = total time a resource spends on one unit (Worker 3: 6 + 2 + 2) | L2 p.38 |
| 4b | Resource pooling: pool capacity = number of resources × capacity of one | L2 p.31–35, in-class exercise p.2 |
| 4b | Fixing one bottleneck can create another | L2 p.34–35, p.40 |
| 4c | Process capacity = minimum capacity over all resources; relieve a bottleneck by reducing its unit load | L2 p.28–29, p.40; L3 p.5, p.13 |
| 5a | Unit load = 1 / capacity rate, filling in the table | L2 p.39–40 |
| 5b | Throughput rate = min{capacity rate, input rate} | L2 p.46 |
| 5b | Utilization = throughput rate ÷ resource capacity rate | L2 p.47–49, in-class exercise p.4 |

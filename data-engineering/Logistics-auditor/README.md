# Last Mile Logistics Audit: Veridi Logistics

**Candidate:** Joshua Akintemi | **Track:** Data Engineering

## A. Executive Summary

Late deliveries at Veridi are a regional problem, not a nationwide one. Across 96,470 delivered orders, 93.2% arrived on or before the promised date, but the late rate ranges from 2.8% to 21.4% by state, and the Northeast and Rio de Janeiro receive 22% of orders while accounting for 40% of late deliveries. The delivery estimates are inaccurate in two directions: the typical order arrives 12 days early, yet the same margin is too small in the worst-affected states. Lateness is strongly linked to bad reviews, with on-time orders averaging 4.29 stars against 2.27 for late orders, and the drop beginning on the promised date. Late deliveries and low scores also spiked together in November 2017 and February-March 2018, which is most likely the spike the CEO noticed.

| Key number                                                   | Value                   |
| ------------------------------------------------------------ | ----------------------- |
| Delivered orders analysed                                    | 96,470                  |
| Arrived on or before the promised date                       | 93.2%                   |
| Late rate, best state to worst state                         | 2.8% to 21.4%           |
| Average review score, on time vs late                        | 4.29 vs 2.27            |
| Share of late deliveries in the Northeast and Rio de Janeiro | 40%, from 22% of orders |

## B. Project Links

- **Notebook (Google Colab):** https://colab.research.google.com/drive/1fv4QyaBgJAdyyPnErRK_G-gYI9RRnirA
- **Dashboard (Google Data Studio, formerly Looker Studio):** https://datastudio.google.com/reporting/319a47c0-9c05-47e8-a204-91ba3ad25d03
- **Presentation (slides):** https://drive.google.com/file/d/18Sn3Vtb1N86zL7slFu4HrxoNMvgWhKp7/view?usp=sharing
- **Notebook files in this folder:** `last_mile_logistics_audit.ipynb` and its HTML export `last_mile_logistics_audit.html` (download the HTML and open it in a browser to see all charts)

## C. Technical Explanation

### Data cleaning

- **Duplicate reviews.** The reviews table has 99,224 rows for 98,673 orders, so 551 rows are repeat reviews. I kept the most recent review per order before joining, because a plain join would have duplicated orders. Both joins use `validate="one_to_one"`, and an `assert` confirms the master table still has 99,441 rows.
- **Orders that were never delivered.** I classified only orders with status `delivered` and a delivery date (96,470). The other 2,971 are flagged as "Not Delivered" and kept out of the late-rate calculations. This includes 8 orders marked delivered with no delivery date and 6 with a delivery date but a non-delivered status.
- **Delay calculation.** `Days_Difference` is the estimated date minus the actual delivery date, compared as calendar days. The estimate has no time of day, so an order arriving at any hour on the promised date counts as on time. Orders are classified as On Time (0 or more), Late (1 to 5 days late) or Super Late (more than 5 days late).
- **Product categories.** Categories are translated with the dataset's translation file. Two categories missing from that file were mapped manually. Because an order can contain several items, I used the category of the first item to keep one row per order. 2,191 orders with no item record or no category are labelled "unknown".
- **Small samples.** States with fewer than 100 orders (RR, AP, AC) are reported with a caution, and category comparisons use only categories with at least 500 orders.
- **Reproducibility.** The notebook downloads the data with `kagglehub` and uses relative paths only. The raw dataset is not included in this repository.

### Candidate's Choice: recalibrating the delivery promise

For each state, I calculated how many days would need to be added to the delivery estimate so that 95% of orders arrive on or before the promised date. The method takes the 95th percentile of the delay in days for each state with at least 200 orders, then replays past orders with the longer estimates.

**Why it matters to the business:** the analysis shows that a missed promise costs about two review stars, while arriving earlier than promised earns almost nothing. The most direct way to protect review scores is therefore to make promises that hold. This analysis shows where to act first and by how much: 19 of 23 states would need a longer estimate, with the largest gaps (+12 to +13 days) in the Northeast and Rio de Janeiro, while São Paulo and Minas Gerais need no change. Replaying history with these estimates would have avoided 2,143 broken promises, cutting the national late rate from 6.8% to 4.6%.

**Limits:** this is a replay of past orders, not a forecast. It assumes delivery times stay the same and that longer estimates do not discourage customers from buying. The size of the adjustments also shows that the underlying issue is a minority of very late orders, which longer estimates alone cannot fully fix.

### Where each requirement is answered

| Requirement                                                               | Notebook section                      | Dashboard                                  |
| ------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------ |
| Story 1: join orders, reviews and customers without duplicates            | 2. Building the master table          | One row per order feeds every chart        |
| Story 2: days difference, On Time / Late / Super Late, undelivered orders | 3. Calculating delivery delays        | Score cards and the Delivery status filter |
| Story 3: late rate by state, remote states                                | 4. Late deliveries by state           | Map and state bar chart, Region filter     |
| Story 4: delay vs review score, On Time vs Late                           | 5. Delays and review scores           | Review score charts and the monthly trend  |
| Bonus: categories in English                                              | 6. Product categories in English      | Category chart and Category filter         |
| Candidate's Choice                                                        | 7. Recalibrating the delivery promise | Explained above                            |

### How to run the notebook

1. Open the Colab link above and choose **Runtime > Run all**. No setup or API key is needed, because the dataset is public and is downloaded by the first cell.
2. To run it locally, install `pandas`, `numpy`, `matplotlib` and `kagglehub`, then run the `.ipynb` from this folder.

**Data source:** Olist Brazilian E-Commerce Public Dataset (Kaggle, CC BY-NC-SA 4.0).

---

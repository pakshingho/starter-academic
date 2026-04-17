---
title: 3. Trust in Online Markets
linktitle: 3. Trust
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
menu:
  economics-of-digital-platforms:
    identifier: chapter-trust
    weight: 4
weight: 4
---

The trust session adds a crucial correction to growth-centric platform thinking: network effects are not enough if participants expect cheating, low quality, or manipulation. In anonymous digital markets, trust is an economic input.

![Trust loop for online markets](/media/platforms/platform-trust-loop.svg)

<div id="doordash-kitchens"></div>

### 3.1 DoorDash Kitchens as a case about cross-side value

The session opens with `DoorDash Kitchens`, the shared-kitchen or ghost-kitchen initiative in Redwood City and San Jose. The example matters because it sits at the intersection of infrastructure, network effects, and trust.

The basic idea is:

- more restaurants in the facility create more variety for diners
- more diner demand makes the facility more attractive to restaurants
- operational infrastructure lowers the cost of expansion for participating restaurants

That is not just a scale story. It is an indirect network-effect story. The service becomes more valuable to each side as the complementary side deepens.

The comparison to `Amazon FBA` is also helpful. Warehousing and fulfillment are operational services, but they strengthen marketplace participation by making the whole transaction more reliable and more scalable.

<div id="trust-game"></div>

### 3.2 The trust problem in one-shot digital exchange

The core conceptual device in the session is a simple trust game:

- buyer decides whether to transact
- seller decides whether to honor the transaction or cheat

In a one-shot game with asymmetric information, the seller may have an incentive to cheat after receiving payment. Anticipating that, the buyer may refuse to transact in the first place. The result is inefficient non-exchange even when both sides could be better off under cooperation.

This is why trust is not a soft culture topic in platform economics. It is part of what determines whether the market clears at all.

The session's deeper point is that online platforms often recreate the conditions of trade among strangers:

- little prior relationship
- incomplete information
- potentially weak legal recourse
- lots of first-time interactions

So the platform has to build substitute institutions.

<div id="historical-institutions"></div>

### 3.3 Historical institutions and the Maghribi traders help explain modern design

The notes reference Avner Greif's work on medieval Mediterranean trade and the Maghribi traders. The historical lesson is not that digital platforms resemble medieval guilds literally. It is that trust can emerge when a community develops:

- reputation mechanisms
- repeated interaction
- sanctions for misconduct
- reliable information flows

Where legal enforcement is weak or too slow, these institutions allow exchange to happen anyway.

Platforms are modern institution-builders in exactly that sense. Ratings, identity verification, fraud models, refund guarantees, and dispute resolution are digital substitutes for the informal and communal enforcement systems that earlier trade networks relied upon.

<div id="ebay-feedback"></div>

### 3.4 eBay's feedback system shows both the power and the limits of reputation

`eBay` is the session's main case study. A guide to seller feedback mechanics [1](https://www.3dsellers.com/blog/the-complete-guide-to-ebay-seller-feedback) is helpful for the concrete structure described here. The basic public feedback system is simple:

- positive feedback adds to a seller's score
- negative feedback subtracts from it
- detailed seller ratings break performance into additional dimensions such as shipping, communication, and item accuracy

The surprising empirical result in the notes is that seller reputation scores are extremely compressed. Median positive feedback is effectively perfect, the mean is around `99.3%`, and even lower percentiles remain very high.

That creates an information problem:

- if almost everyone looks excellent, buyers cannot distinguish high-quality sellers from merely adequate ones
- public reputation becomes less informative than its simplicity suggests

The session uses this to ask whether the platform is seeing:

- selection, where weak sellers exit and only strong ones remain
- or bias, where negative reviews are systematically underreported

The answer is probably a mix of both.

<div id="retaliation-and-bias"></div>

### 3.5 Feedback systems are vulnerable to reciprocity and retaliation

The notes point to a subtle but important design failure: buyers may delay or suppress negative feedback if they fear seller retaliation. That means public ratings can become strategically distorted.

This matters beyond `eBay`. In lodging, ride-sharing, freelance work, and peer-to-peer commerce, both sides may worry about retaliation or social friction.

The broader lesson is that reputation systems must be designed to elicit honest information, not simply display submitted ratings. That is why platforms often move toward:

- simultaneous review release
- delayed publication
- two-sided blind review windows
- stronger private enforcement signals behind the scenes

Without those design choices, the reputation layer can look healthy while conveying very little real information.

<div id="reputation-effects"></div>

### 3.6 Effect of reputation on buyer behavior

One of the more interesting observations in the source material is about the effect of reputation on buyer behavior: buyers who purchased from sellers with a perfect `100%` positive-feedback score were reportedly less likely to return to `eBay` than buyers who purchased from sellers with slightly lower scores.

The notes suggest at least two plausible explanations:

- selection bias, where experienced buyers may choose less-established sellers for price or niche reasons
- reputation compression, where a near-perfect score no longer differentiates seller quality meaningfully

This is an important extension of the trust argument. A reputation system can look reassuring while conveying almost no marginal information. That is exactly when platforms need richer internal signals instead of relying on the visible headline metric.

<div id="richer-signals"></div>

### 3.7 Data-driven improvements: better trust systems use operational data, not only star ratings

One of the best parts of the session is the move from visible ratings to richer inferred trust signals. The notes describe `eBay` experiments that used:

- returns
- disputes
- low detailed seller ratings
- transaction messages and unstructured text
- broader patterns of buyer satisfaction

An A/B test that weighted predicted feedback rather than only simple historical percent-positive scores improved repeat purchasing. That is a major platform-design insight: trust can be improved through ranking models, not just policy language.

Public reputation and internal trust prediction are related but not identical.

Internal trust models can answer questions like:

- which transaction is most likely to disappoint the buyer?
- which seller is generating subtle but recurring service failures?
- which reviews are more credible because of reviewer quality and behavior?

Those are ranking and causal-inference problems as much as policy problems.

<div id="design-patterns"></div>

### 3.8 Trust design patterns that platforms repeatedly rediscover

The session implies a practical design toolkit:

- identity and payment verification
- clear consequence systems for abuse and low quality
- refund and guarantee mechanisms that lower perceived downside risk
- fraud models that combine behavior, content, and historical outcomes
- ranking systems that demote unreliable suppliers before users explicitly complain
- review-system designs that minimize retaliation

Trust is therefore not separate from the marketplace algorithm. It shapes search ranking, supplier visibility, matching quality, and long-run retention.

### 3.9 Trust is the bridge between network effects and durable growth

If Chapter 1 explains how platforms grow and Chapter 2 explains how they monetize, this chapter explains why both can fail.

Without trust:

- buyers transact less
- sellers invest less in quality
- cross-side network effects weaken
- customer acquisition becomes more expensive because retention falls

With trust:

- more first transactions happen
- more repeat transactions happen
- quality improves because incentives become clearer
- the platform can rely less on blanket subsidy and more on durable reputation

That is why trust belongs at the center of platform economics rather than at the edge of operations.

### 3.10 References

1. [The Complete Guide to eBay Seller Feedback](https://www.3dsellers.com/blog/the-complete-guide-to-ebay-seller-feedback)

---
title: 2. Designing Digital Platforms
linktitle: 2. Platform Design
toc: false
type: docs
date: 2026-04-17
lastmod: 2026-04-17
draft: false
menu:
  economics-of-digital-platforms:
    identifier: chapter-platform-design
    weight: 3
weight: 3
---

The second session turns from "why platforms can scale" to "how they are designed to make money without breaking participation." That shift matters because a large user base is not itself a business model. Platform strategy has to specify who pays, why they pay, and how monetization interacts with network growth. The original session video is [1](https://vimeo.com/928404650).

![Two-sided pricing and participation flywheel](/media/platforms/platform-pricing-flywheel.svg)

<div id="business-model-basics"></div>

### 2.1 A business model is a monetization logic, not a growth slogan

The session uses a line from Michael Lewis's *The New New Thing* to make an old but still relevant point: a business model is a plan for making money. During the dot-com era, firms often blurred user attention with actual monetization.

That warning still matters in platform markets because it is easy to confuse:

- user growth with economic value
- gross merchandise volume with platform revenue
- revenue with contribution margin
- short-run monetization with long-run network health

The right question is not only "How do we grow?" It is "How does the platform eventually capture part of the value it helps create?"

<div id="ebay-paypal"></div>

### 2.2 eBay and PayPal as a platform-complement story

One of the session's most helpful examples is the early relationship between `eBay` and `PayPal`.

The story matters for two reasons:

- `PayPal` piggy-backed on the activity already happening in `eBay`
- `eBay` benefited from a payments layer that reduced friction and made trade easier

The rough timeline in the notes is:

- `PayPal` launched email-based payments in 1999
- it quickly became a default payment tool inside `eBay` transactions
- growth on `eBay` accelerated `PayPal` adoption
- `eBay` acquired `PayPal` in 2002
- later, `PayPal`'s stand-alone value ultimately exceeded the value of the acquisition by a wide margin

This example expands the idea of network effects [2](https://en.wikipedia.org/wiki/Network_effect). Sometimes the valuable complement is not another user group in the same app but an adjacent service that makes the platform more usable. Payments, logistics, identity, and analytics can all play that role.

<div id="willingness-to-pay"></div>

### 2.3 From willingness to pay to the demand curve

The session uses a step-function view of willingness to pay to build intuition about demand:

- rank users from highest willingness to pay to lowest
- stack them cumulatively
- the resulting curve slopes downward because later users are less willing to pay

That framing is useful because it links product thinking and economics cleanly:

- a better product can shift the willingness-to-pay distribution upward
- stronger network effects can flatten the quantity drop from a given price increase
- better targeting or versioning can extract more surplus without charging everyone the same price

The notes discuss a simple revenue comparison across prices such as `$500`, `$600`, and `$700` to show that revenue is price times quantity and therefore does not rise mechanically with price. The "right" price depends on how participation responds.

In platform markets, that logic gets more complicated because participation on one side changes value on the other side.

<div id="elasticity"></div>

### 2.4 Elasticity is ecosystem-wide in two-sided markets

The session introduces price elasticity and cross-side elasticity as preparation for marketplace pricing. That move is essential. In a one-sided product, the main question is how buyers respond to price. In a two-sided platform, changing price on one side can alter:

- participation on that side
- network value on the opposite side
- monetization opportunities elsewhere in the stack

So the platform does not simply ask, "Who can we charge?" It asks:

- which side is more price sensitive?
- which side unlocks activity on the other side?
- how much should we subsidize one side to grow the total network?

This is why many marketplaces charge sellers, merchants, or advertisers much more aggressively than end users.

<div id="connectivity-platforms"></div>

### 2.5 Connectivity platforms: advertising versus freemium

The session contrasts two common models for social, messaging, and community products.

Advertising model:

- users get free access
- advertisers become the paying customer class
- the platform monetizes attention and targeting

Freemium model:

- a free tier preserves network growth
- a smaller set of users pays for premium quality, status, convenience, or functionality

The `Discord` example is especially useful. The notes explain that Discord avoided a heavy advertising model because interest-based communities rely on trust, shared identity, and conversational quality. A premium tier for enhanced quality fit the product better than an ad-heavy experience that could have degraded community trust. That sits squarely inside the broader freemium model [3](https://en.wikipedia.org/wiki/Freemium).

The `Napster` example points to another idea: even platforms that fail legally or operationally can still have monetizable user bases if engagement is unusually sticky. The notes mention that Napster's users retained substantial value despite the service's collapse.

The design lesson is not that one model is always superior. It is that monetization must match the social logic of the product.

<div id="matching-platform-pricing"></div>

### 2.6 Matching platforms should price for liquidity, not symmetry

In marketplaces, the lecture emphasizes that "one side pays everything" and "both sides pay something" are not fundamentally different business models. Setting one side's price to zero is just an extreme point on a pricing schedule.

Examples from the notes:

- `eBay`, `Uber`, and `Etsy` often lean toward charging the supply side more
- `Airbnb` and `Grubhub` can split fees across both sides

The underlying decision rule is comparative elasticity. If buyers are more price sensitive than sellers, subsidizing buyers can be rational because more buyer participation increases seller value and overall liquidity.

That same logic explains the two-sided pricing flywheel:

- price on the buyer side affects buyer participation
- price on the seller side affects seller participation
- the participation levels affect each other through network effects
- the platform can then re-optimize pricing once the network thickens

Pricing is therefore part economics, part sequencing problem.

<div id="versioning-and-vas"></div>

### 2.7 Versioning is broader than freemium

The session treats versioning as a general pricing architecture rather than a narrow premium-upgrade trick. A concise explainer on price versioning [4](https://dealhub.io/glossary/price-versioning/) uses the same broader idea. Versioning can include:

- quality-ranked versions, such as better audio or premium features
- quantity discounts for high-volume sellers
- subscription memberships for frequent users
- value-added services layered on top of the core marketplace

The specific examples in the notes are worth preserving:

- `Discord` and dating apps sell better quality or additional features
- `eBay Stores` and `Amazon Professional Seller` style plans create seller tiers
- `Uber Pass`-like memberships reward heavy users
- value-added operational services create monetization beyond the basic take rate

This is where the session becomes especially important for modern platform strategy. Many durable platforms do not earn from a single commission line. They build a revenue stack.

<div id="value-added-services"></div>

### 2.8 Value-added services as a second layer of platform economics

The notes highlight `DoorDash` and `Amazon` as strong examples of how marketplaces deepen monetization:

- `DoorDash` offers kitchens, dashboards, and operating support
- `Amazon` offers fulfillment, lending, seller tooling, and analytics

These services matter for more than revenue. They can:

- reduce supplier-side friction
- improve reliability and customer experience
- make sellers more dependent on the platform's operational infrastructure
- turn platform data into new products

This is an important extension of the session. Platform design is often about deciding when to remain a neutral intermediary and when to become an infrastructure provider to one side of the market.

<div id="data-and-ads"></div>

### 2.9 Data is a strategic asset, but monetization has trade-offs

The session closes by stressing customer understanding and data use. Because platforms mediate interaction, they observe:

- search and browsing behavior
- transaction patterns
- conversion funnels
- willingness-to-pay proxies
- quality failures and pain points

That data can improve:

- matching and ranking
- ad targeting
- product design
- versioning choices
- value-added service development

The notes also make an important ad-market point. Advertising works especially well when a platform has large scale and rich behavioral data, but ads can also damage experience and trust if the balance is wrong. That is why some platforms prefer to monetize a subset of users directly rather than maximize advertising load.

The practical lesson from this session is that platform monetization is not a single decision. It is a system of choices about subsidy, trust, versioning, and what additional layers of service the platform should own.

### 2.10 References

1. [EODP-session-2 W22 | Videos & Movies on Vimeo](https://vimeo.com/928404650)
2. [Network effect](https://en.wikipedia.org/wiki/Network_effect)
3. [Freemium](https://en.wikipedia.org/wiki/Freemium)
4. [What is Price Versioning?](https://dealhub.io/glossary/price-versioning/)

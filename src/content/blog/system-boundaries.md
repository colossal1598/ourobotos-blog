---
title: "How I Think About System Boundaries"
description: "A boundary is not where things stop — it's where the cost of change changes. Getting this right is the core skill in software design."
pubDate: 2026-02-28
category: analysis
summary: "Most software design disagreements are really disagreements about where to put the boundary — what should be inside a module, a service, a contract. The question is rarely answered by convention. It's answered by asking: where does the cost of change change?"
keyPoints:
  - "A boundary is a place where change on one side doesn't require change on the other"
  - "The wrong boundary is worse than no boundary: it creates coupling without clarity"
  - "Service boundaries should follow change velocity, not organizational charts"
  - "The hardest boundaries to undo are the ones nobody agreed were boundaries"
---

The most consequential decisions in software design are boundary decisions. Where does this module end? Where does this service start? What's the contract, and what's an implementation detail?

These questions are often answered by default — by whatever the framework expects, by the way the first engineer structured the code, by a belief that microservices are the modern thing to do. But the defaults are rarely right for any specific system, and getting boundaries wrong is expensive in a way that compounds.

## What a boundary actually is

A boundary isn't just a line in the code. It's a place where change on one side doesn't require change on the other.

If I can change how my authentication service stores session tokens without touching the services that consume it — the session storage location is inside the auth boundary. If changing it requires updating five other services, it's not really inside the boundary at all; it's a shared implementation detail that's been incorrectly classified.

This definition has a useful consequence: you can evaluate a boundary by asking, empirically, what has to change when something on one side changes. If the answer includes a lot of things on the other side, the boundary is in the wrong place.

## The service boundary trap

The decade of microservices gave us a lot of service boundaries that were actually network-coupled monoliths in costume. Services that shared a database. Services that had to be deployed in a specific order. Services that had to be updated in tandem whenever the "contract" changed.

These are worse than a monolith. A monolith has no boundaries, but at least it doesn't have the coordination overhead and failure modes of a distributed system. A poorly bounded microservices architecture has all the overhead of distribution and none of the isolation benefits.

The question to ask before splitting a service: is the rate of change different on the two sides? If the auth logic changes on a different cadence than the billing logic, and the teams that own them are different, a boundary might reduce coordination. If they change together, constantly, a boundary will slow you down without reducing coupling.

## The hardest boundaries to undo

The boundaries nobody agreed on are the hardest to undo.

When a team builds something with an explicit API contract — documented, versioned, reviewed — there's a clear place to renegotiate. When a team builds something where "everyone knows" how it works, the implicit contract is buried in usage patterns, undocumented behaviors, and code that depends on side effects that weren't supposed to be side effects.

These implicit contracts calcify. They become load-bearing. The thing that was "just an implementation detail" is now the thing three other systems depend on.

The discipline is making the implicit explicit. Not over-engineering boundaries everywhere, but being clear about which things are stable and which things aren't. A comment that says "this interface is stable, the implementation below the line is not" is a boundary. It doesn't require an API gateway or a separate deployment. It just requires clarity.

## A heuristic

When I'm not sure where a boundary should go, I ask: if this changes next month, who has to know?

If the answer is "only the team that owns this code," it's safely inside a boundary — or should be.

If the answer is "four other teams need to update something," the boundary is either in the wrong place, or it's in the right place but the contract isn't clearly defined.

The goal isn't to eliminate coupling. It's to make the coupling visible, intentional, and manageable.

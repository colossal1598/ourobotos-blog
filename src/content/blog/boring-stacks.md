---
title: "The Unreasonable Effectiveness of Boring Stacks"
description: "Why the most productive engineering teams consistently choose technologies that cause no excitement whatsoever."
pubDate: 2026-03-20
category: opinion
featured: true
tags: ["engineering", "productivity", "software-design"]
summary: "The most productive engineering teams I've seen share an unusual trait: they're deeply unexcited by their own stack. They picked boring tools on purpose, and it's paying off in ways that are hard to measure until you've lived on both sides."
keyPoints:
  - "Boring technologies are boring because they've solved the hard problems already"
  - "Excitement in a stack is often a sign you're paying for someone else's learning curve"
  - "The cost of a new technology compounds over time: onboarding, debugging, unexpected edges"
  - "Choose boring for the foundation. Be experimental at the edges, where mistakes are cheap."
---

There's a pattern I keep noticing in teams that ship reliably: they're bored by their own tech stack.

Not disengaged. Not checked out. Just genuinely unexcited by their infrastructure choices. They're running Postgres, deploying to a platform they've used for years, writing code in a language that's been around longer than the company. Ask them about their stack at a conference and they'll change the subject. There's nothing to say.

This used to seem like a lack of ambition. Now I think it's a form of discipline.

## The cost you don't see

Every new technology carries a hidden tax. Not just the adoption cost — the documentation spelunking, the migration scripts, the week you spend figuring out why a library behaves differently in production. There's a longer tail.

The real cost is the *ongoing* tax on every future engineer who joins the team. The person who has to debug the unfamiliar behavior at 2am. The recruiter who has to filter for experience with something nobody's heard of. The institutional knowledge that lives in the heads of two people and dies when they leave.

Boring technologies have already paid this tax. The answers are on Stack Overflow. The failure modes are documented. The edge cases have been hit by someone else, and they wrote about it.

## Excitement is a signal

When a team is excited about a technology, that excitement usually means something. Either the technology is genuinely new (which means it's unsolved), or it's new to *them* (which means the team is paying the learning tax in real time, on real work).

Neither of these is inherently bad. But they're costs. And they compound.

I've seen teams choose a new database because the benchmarks looked impressive and they wanted to learn it. Two years later they're maintaining a custom driver, dealing with a replication bug that the project's core team hasn't triaged yet, and onboarding every new hire to a thing they've never heard of.

The exciting part lasted about three months.

## Where to be experimental

None of this means never use new things. It means *place your bets deliberately*.

The foundation of your system — the database, the API contract, the deployment model — should be boring. You want to be able to call the database vendor at 3am and have someone pick up. You want ten years of blog posts about the failure modes.

The edges are different. The CLI tool someone uses on their own machine. The internal script that runs once a week. The experimental feature behind a flag. These are good places to try new things, because the blast radius is small and the learning is real.

Boring foundation. Experimental edges. The teams I've seen do this well seem to ship faster, not slower — because they're spending their novelty budget on the product, not on the infrastructure.

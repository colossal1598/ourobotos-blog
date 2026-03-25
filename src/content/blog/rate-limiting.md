---
title: "Rate Limiting: A Practical Mental Model"
description: "The three types of rate limiting, when to use each one, and why the algorithm choice matters more than the number."
pubDate: 2026-03-10
category: tutorial
tags: ["backend", "performance", "algorithms"]
summary: "Rate limiting is one of those topics that looks simple until you're implementing it under real traffic. The right algorithm depends on what you're actually protecting, and most explanations skip that part."
keyPoints:
  - "Token bucket is the right default: it allows bursts, which is what users actually do"
  - "Fixed window counters are simple but create predictable abuse windows at the reset boundary"
  - "Sliding window logs are precise but memory-intensive at scale"
  - "The limit number is less important than understanding what failure looks like for your users"
---

Rate limiting is one of those things that seems obvious until you sit down to implement it. You think: count the requests, stop at the limit. What's hard about that?

What's hard is that "count the requests" hides a question: *which requests, in which window?* The answer determines whether your limiter is fair, gameable, or somewhere in between.

## The three models

There are three main algorithms in practice. Each makes a different tradeoff.

### Fixed window

The simplest approach. Define a time window (say, one minute). Count requests in the current window. When the count hits the limit, reject. At the start of the next window, reset.

The problem: the boundary is predictable. A client can send 100 requests at 11:59:59, wait one second, and send another 100 at 12:00:01. You've allowed 200 requests in two seconds while technically staying within your stated limit.

Use this when: the burst vulnerability doesn't matter for your use case, or you need the simplicity of a single counter in a cache.

### Token bucket

More flexible. Imagine a bucket that fills with tokens at a steady rate — say, 10 tokens per second, up to a maximum of 100. Each request costs a token. When the bucket is empty, requests are rejected.

This allows bursts up to the bucket size, then throttles to the fill rate. That matches how real users behave: they open a page, fire a bunch of requests, then settle into normal usage. You're not punishing legitimate burst behavior.

This is the right default for user-facing APIs.

### Sliding window log

The most precise approach. Keep a log of every request timestamp for the past N seconds. When a request comes in, count how many entries are in the log within the window. If it's over the limit, reject.

This is accurate — no boundary artifacts, no burst allowance beyond the true rate. But it uses memory proportional to the number of recent requests, which can be significant at scale.

Use this when you need provable precision, typically in billing or compliance contexts.

## The limit is the wrong thing to optimize

Teams spend a lot of time debating the number: 100 requests per minute? 500? What does the SLA say?

The more important question is: what happens when a client hits the limit? Do they get a clear error with a `Retry-After` header? Does the error make sense in the context they're using your API? Will their client back off correctly, or retry aggressively and make things worse?

A good rate limiting implementation has:
- A consistent response format (`429 Too Many Requests` with `Retry-After`)
- Per-client limits, not global (so one bad actor doesn't take down everyone)
- Visibility — you should be able to tell when legitimate clients are being limited

The algorithm matters. The limit matters. But the experience when limits are hit is what separates a rate limiter that helps from one that just makes debugging harder.

## Implementation note

If you're using Redis, the `INCR` + `EXPIRE` pattern implements fixed windows. The `ZRANGEBYSCORE` + `ZADD` pattern implements sliding windows. Token buckets require a bit more: store the current token count and last refill timestamp, then calculate on each request.

For most applications, a token bucket in Redis with a sensible max and fill rate is the right starting point. Add observability before you tune the numbers.

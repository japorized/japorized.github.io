---
layout: math
title: Axiom of Choice
---

In PMATH351 F17, I was (re)introduced to the Axiom of Choice. The following is my understanding and interpretation, or at least my attempt at interpreting the axiom, and other statements that are equivalent to it.

#### Axiom of Choice (AC)

$$\forall \{A_i\}_{i \in I} \; A_i \neq \emptyset \quad \prod_{i \in I} A_i \neq \emptyset$$
{: style="text-align: center"}

which says that for a family of non-empty sets, the Cartesian product of all such sets is non-empty.

An alternative definition was given with the use of the choice function:

#### Axiom of Choice (AC')

$$X \neq \emptyset \quad \exists f:\mathcal{P}(X) \setminus \{\emptyset\} \to X \quad \forall A \in \mathcal{P}(X) \setminus \{\emptyset\} \quad f(A) \in A$$
{: style="text-align: center"}
which says that given a non-empty set $$X$$, there exists a choice function $$f$$ that maps from the power set of $$X$$ less the empty set to $$X$$ itself, such that for all such sets in the domain, their images are themselves.

What may be interesting in the alternative definition (hereafter referred to as AC'), the image set of A is an element of itself instead of being a subset or the set itself.

Without further probing on such a weird question, notice that this definition makes sense if we believe that the axiom of choice states, in layman terms, that for any number of non-empty sets, we may pick an element from each set. In this case, the choice function acts as our "way" of picking the element.

The following is a prove of the two statements.

---

For $$(AC) \implies (AC')$$, since $$\prod_{i \in I} A_i \neq \emptyset$$,

$$\exists (x_A)_{A \in \mathcal{P}(X)\setminus\{\emptyset\}} \in \prod_{A \in \mathcal{P}(X)\setminus\{\emptyset\}} A$$
{: style="text-align: center"}
Thus we can just choose $$f(A) = x_A$$.

For $$(AC') \implies (AC)$$,

$$X = \bigsqcup_{i \in I} A_i \quad f: \mathcal{P}(X) \setminus \{\emptyset\} \to X \implies \Big( (f(A_i) \Big)_{i \in I} \in \prod_{i \in I} A_i$$
{: style="text-align: center"}

---

Before going further to the other equivalent statements, we name the following definition:

**Chain**: _Let $$(X, \leq)$$ be a partially ordered set. A chain is a set $$S \subset X$$ such that $$S$$ has a total order, i.e. $$\forall x, y \in S$$, either $$x \leq y$$, or $$\leq x$$ and not both._

---

The Axiom of Choice is also equivalent to 3 other statements, namely:

#### Haussdorff's Maximality Principle (HMP)

_In any partially ordered set $$ (S, \leq ) $$, there is a maximal chain , i.e. a chain $$M$$ such that no $$M \cup \{s\}$$ is a chain for any $$S \setminus M$$._

#### Zorn's Lemma (ZL)

_Let $$(X, \leq)$$ be a partially ordered set. If every chain in $$(X, \leq)$$ has an upper bound, then there is a maximal $$m \in X$$, i.e. $$\forall s \in S \; m \leq s \implies m = s$$._

#### Well-Ordering Principle (WOP)_

_Any non-empty set $$X$$ has a well order, i.e. $$\forall \emptyset = S \subseteq X \; \exists s \in S \; \forall t \in S \; s \leq t$$, or in words, any subset of X has a minimal element._

_This page is still incomplete_

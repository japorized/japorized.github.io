---
layout: math
title: Axiom of Choice
---

In PMATH351 F17, I was (re)introduced to the Axiom of Choice. The following is my understanding and interpretation, or at least my attempt at interpreting the axiom, and other statements that are equivalent to it.

The "first" statement of the axiom of choice is given as

$$\forall \{A_i\}_{i \in I} \; A_i \neq \emptyset \quad \prod_{i \in I} A_i \neq \emptyset$$
{: style="text-align: center"}

which says that for a family of non-empty sets, the Cartesian product of all such sets is non-empty.

An alternative definition was given with the use of the choice function:

$$X \neq \emptyset \quad \exists f:\mathcal{P}(X) \setminus \{\emptyset\} \to X \quad \forall A \in \mathcal{P}(X) \setminus \{\emptyset\} \quad f(A) \in A$$
{: style="text-align: center"}
which says that given a non-empty set $$X$$, there exists a choice function $$f$$ that maps from the power set of $$X$$ less the empty set to $$X$$ itself, such that for all such sets in the domain, their images are themselves.

What may be interesting in the alternative definition (hereafter referred to as AC'), the image set of A is an element of itself instead of being a subset or the set itself.

Without further probing on such a weird question, notice that this definition makes sense if we believe that the axiom of choice states, in layman terms, that for any number of non-empty sets, we may pick an element from each set. In this case, the choice function acts as our "way" of picking the element.

The following is a prove of the two statements. We shall also label the "first" statement as AC.

For $$(AC) \implies (AC')$$, since $$\prod_{i \in I} A_i \neq \emptyset$$,

$$\exists (x_A)_{A \in \mathcal{P}(X)\setminus\{\emptyset\}} \in \prod_{A \in \mathcal{P}(X)\setminus\{\emptyset\}} A$$
{: style="text-align: center"}
Thus we can just choose $$f(A) = x_A$$.

For $$(AC') \implies (AC)$$,

$$X = \bigsqcup_{i \in I} A_i \quad f: \mathcal{P}(X) \setminus \{\emptyset\} \to X \implies \Big( (f(A_i) \Big)_{i \in I} \in \prod_{i \in I} A_i$$
{: style="text-align: center"}

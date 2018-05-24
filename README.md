# Memory Game Project

## Table of Contents

* [Overbiew](#overview)
* [How to Play](#howtoplay)
* [Dependencies](#dependencies)

## Overview

This project was developed as a requirement for the 2018 Udacity Front-End Nanodegree program. 

[Project Specification](Project%20Specification.pdf)

## How to Play

The game is based on the classic card game Memory. The goal is to match two identical cards in as few moves as possible. To achieve a good score requires a strong memory of where you had seen cards previously.

The game starts with 16 cards faced down. A single click will turn a card face-up. After two cards are turned faced-up, they are checked to see if they are a pair. If paired, the paired animation executes, then they remain face-up and are no longer in play. If they are not a pair, a mismatched animation executes, they are returned to face down, and remain in play.

A score panel maintains the star level, move count, timer, and a restart button. The star level is based on the move count. One move consists of two turned over cards. 

*Star Levels*
  * 3 Stars -   Moves less than 20
  * 2 Stars -   Moves between 21 and 29
  * 1 Star  -   Moves greater than 30


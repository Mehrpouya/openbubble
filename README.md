# Aim:
This extension aims to browse the web in the background trying to break the persona that corporations has on each individual and try to diversify it. The websites will be loaded randomly using the algorithm below.
## Philosophy:
This program attempts to mimic users online behaviour. By using WEBExtention API, this application will:
 1. Follow a similar pattern to each users internet activity.
 2. Surf the web by following a) contradicting behaviour to its host user. b) looking at new topics and content that the user normally doesn't look at.
## Approaches:
### 1. New knowledge
#### 1.1. Tagging or Topic selection
In order to add new knowledge bubbles into existing echo chambers of knowledge, we will first randomly/content tagging ( for example using Open Callaise) choose a topic.
#### 1.2. Search engine introduction to new topic of interest
- Searching specific keywords within a certain domain of knowledge
- Getting X (10) links from each engine.
- Openning them at X seconds intervals
    - This X seconds/minutes interval will be based on the average time it takes to read or skim through a page.
    - In future versions this can be expanded to learn from the behaviours of the user for example how long does it take them to read a page and based on this close or open new content.

**Repeat 1.2 for XX period of time.**

### 2. Existing knowledge
In order to expand existing knowledge bubble, the extension will search contradictory topics. In this method we will use a dictionary with list of antonyms and opposites.

## To Think:
1. How to choose the topics?
2. How to behave in contradictory manner in comparison to the user?
3. How long should the robot sustains a behaviour to convince data providers that our user is now interested in the new topic?
4. How to workout what kind of content the user browses?
    1. For example are they looking at right/left wing news?
    2. Are they only looking at technology related material?


### 4. How to workout what kind of content the user browses?
Here we have a choice of several different approaches. a) use semantic search engines b) content analysers such as Callais c) develop a local dictionary

a. Semantic search:
Semantic search engines help analysing the data and breaking it down ito core elements. This is something that can be done via an online service such as Callais tool or use locallly hosted options such as [opensemanticsearch](https://www.opensemanticsearch.org/doc/admin/install/desktop_search)


#### User of mining services as oppose to local software:
By using a web service, this means the content the user is browsing has to be sent to an external entity which is a great risk to the user as they may not want to send any of the pages they view into an external third party service provider even though many cookies and content providers are already tracking them.




## Design:
One of the challenges to develop a program that can function meaningfully, i.e. it is not easy to identify it as a robot or spam is it will run its tasks based on users actions.
For example when then user starts a new tab, this extention will also refresh its tab and loads new content. In this way we reduce the chance of search engines, social media and data minners to detect the real identity of this tool.

# FAQ

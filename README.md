# Aim:
This extension aims to browse the web in the background mimicking users behavior. The extension aims to break the persona that corporations has on each individual and tries to diversify it. The websites will be loaded based on the algorithm below.
## Philosophy:
This program attempts to mimic users online behaviour. By using WEBExtention API, this application will disrupt a) knowledge bubble b) consumer bubble
### Knowledge bubble
 1. Follow a similar pattern to each users internet activity.
    - As soon as the user open a new tab, this extension will also open a link
    - This will always be the first tab in each session
 2. Get a link of topics from wikiedia list of topics randomly
 3. store the topic in session storage
 4. search on google, duckduckgo and bing for results
 5. Store the links each search engine returned in sessions storage.
    - This will be about 30 links total
 6. Surf the links

 ### Consumer bubbles
 This section aims to confuse federated search engines such as skyscanner
 #### Transport
 1. Do one search per day on skyscanner flight from one city to another
 #### shopping
 1. Do one search per day for products on Ebay, Amazon

## Approaches:
### 1. New knowledge
Below there are two methods to disrupt knowledge bubble with pros and cons for each.
#### 1.1. Tagging or Topic selection
In order to add new knowledge bubbles into existing echo chambers of knowledge, we will first do a content tagging (using Open Calais & Stanford NLP) for topic extraction.
##### 1.1.1. How to workout what kind of content the user browses?
Here we have a choice of several different approaches. a) use semantic search engines b) content analysers such as Calais c) develop a local dictionary

a. Semantic search:
Semantic search engines help analysing the data and breaking it down ito core elements. This is something that can be done via an online service such as Calais tool or use locally hosted options such as [opensemanticsearch](https://www.opensemanticsearch.org/doc/admin/install/desktop_search)


##### 1.1.2. User of mining services as oppose to local software:
By using a web service, this means the content the user is browsing has to be sent to an external entity which is a great risk to the user as they may not want to send any of the pages they view into an external third party service provider even though many cookies and content providers are already tracking them.
##### Pros & Cons
**Pros:**
- We can have a customised list of topics each user is interested in
- Accurate
  - In order to expand existing knowledge bubble, the extension will search contradictory topics. In this method we will use a dictionary with list of antonyms and opposites.
**Cons:**
- Data and privacy concerns as we need to send users data out of their PC to external NLP service suck as Open Calais
- Complex infrastructure and this can introduce more risks and difficulty with maintaining it
- Takes a while to have a good dictionary of topics and requires lots of testing

#### 1.2. Topic selection from Wikipedia
We can get list of topics from wikipedia either from their list of [controversial topics](https://en.wikipedia.org/wiki/Wikipedia:List_of_controversial_issues) or [general list](https://en.wikipedia.org/wiki/Portal:Contents/Lists).

**Pros:**
- Easy to get the list from Wikipedia
- easier to implement
- secure as no data will go out of users browser
**Cons:**
- We can't target specific behaviours or knowledge bubbles
- Takes longer to disrupt  



## To Think:
1. How to choose the topics?
2. How to behave contradictory to the user?
3. How long should the robot sustains a behaviour to convince data providers that our user is now interested in the new topic?
4. &#x1F534; If we use wikipedia controversial topics they include sensetive topics related to abuse, religions, sex. Some of these may be controversial for some people and not for others. Some may be sensetive in terms of legality of searching for these. What should we do about these? If we think based on principles of freedom of speech and liberty should we not be able to search anything? For example the student in one of UK universities who were a muslim studying terrorism and he got reported to the police for reading a book related to terrorism [see link](https://www.theguardian.com/education/2015/sep/24/student-accused-being-terrorist-reading-book-terrorism). or should we be careful so the police and authorities can use our data that ISPs record to monitor and take action when relevant. Can criminals excuse themselves and blame this tool?

## Design:
One of the challenges to develop a program that can function meaningfully, i.e. it is not easy to identify it as a robot or spam is it will run its tasks based on users actions.
For example when then user starts a new tab, this extension will also refresh its tab and loads new content. In this way we reduce the chance of search engines, social media and data minners to detect the real identity of this tool.
How to disrupt google knowledge since they know so much about us. for example they know I am yy years old and a father/mother/brother/...! These can be defined as fact.

##Actions
- Make a list of news providers, distributors accross the board (left, right and center).
- Make a list of consumer products based on the categoris of amazon
- Make a dictionary for querying major consumer websites such as amazon, ebay and google.

# Stages
- [x] Add find a topic functionality
- [ ] Store topic in local storage
- [ ]
# FAQ

# Vuex Store (Scalable state management)

### Mandatory to use. Why?

1. Apps scale getting bigger.
2. Data exchange between each components getting more complicated.
3. Pass props & omit each props or func (very not recommended).

### Solution: State management -> data center.

Vuex -> state management for Vue.js

## Vuex Flow Ilustration

<p align="center">
  <img src="https://blog.logrocket.com/wp-content/uploads/2021/03/state-management-diagram.png" />
</p>

### 4 main aspect on Vuex:

#### 1. STATE : global data

Purpose:

- store global state
- accessible dan appliable to all pages and components
- immutable (cannot directly updated)

#### 2. MUTATIONS : mutate state

Purpose:

- the only way to modify state
- commonly uppercased
- syncronous

#### 3. ACTIONS : commit mutations

Purpose:

- bussiness logic
- asyncronous
- commit (apply) multiple mutations
- API calling (Ajax)

#### 4. GETTERS (optional) : get value directly from state

Purpose:

- return value of the selected state
- avoid repetitive method calling

### When to use Vuex?

Answer:

1. Build big-scale application.
2. Same data needed at two or more completely different components.

### Data Exchange

With fewer components :

<p align="center">
  <img src="https://blog.logrocket.com/wp-content/uploads/2021/03/simple-component-structure.png" />
</p>

With a lot more components :

<p align="center">
  <img src="https://blog.logrocket.com/wp-content/uploads/2021/03/complex-component-structure.png" />
</p>

With Vuex :

<p align="center">
  <img src="https://blog.logrocket.com/wp-content/uploads/2021/03/simplified-vuex-component-structure.png" />
</p>

###### Reference:

https://blog.logrocket.com/scalable-state-management-with-vuex-and-nuxt-js/
https://medium.com/vue-mastery/vuex-explained-visually-f17c8c76d6c4
https://vuex.vuejs.org/#what-is-a-state-management-pattern
https://stackoverflow.com/questions/39299042/vuex-action-vs-mutations#:~:text=Mutations%2C%20as%20the%20name%20suggests,asynchronous%20code%20or%20business%20logic.

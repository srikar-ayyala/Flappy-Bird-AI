# Flappy-Bird-AI

I created a flappy bird clone in Javascipt using the p5 library 
and than implimented a genetic algorithm and neural network so that the AI agent can decide on it's own whether it should jump or not at any given instance.

Try [the game](https://srikar-ayyala.github.io/flappy/) out for yourself!

The need for genetic algorithm in this case was because 1) it would be very difficult to collect training data for the model so we needed to use an algorithm that can learn on its own and from its own mistakes 2) at any given state there are many variables such as the height of the bird, the distance of the nearest pipe, the velocity of the bird, etc. and choosing to jump or not can lead to many possible consecutive state which may not always have a direct impact on whether the bird lives or not but can result in the bird later being in an unfortunate position. hence even for a given position we can't always clearly say if the bird needs to jump or not which makes labeling the data very difficult and reduce the use/effectiveness of training data. And hence in these kinds of situations genetic algorithm can be a good fit for the AI model so that it can learn by itself.

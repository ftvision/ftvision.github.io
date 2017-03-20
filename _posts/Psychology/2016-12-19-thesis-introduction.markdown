---
title: Introduction
subtitle: 
layout: single
---

Vision mainly aims to solve two problems: to know "where" and to understand "what". The former concerns the spatial information, such as locating physical objects in the world; the latter concerns the identity information, such as recognizing and discriminating those objects. Other problems can be settled by the derivations of the solutions of these two problems. For example, the visually guided action can be derived from the knowledge of the locations of the objects in space and relative locations of their parts (Ungerleider & Haxby, 1994). Corresponding to these two main problems, electrophysiology and neuropsychology research has proposed a two-pathway model in the visual brain that two parallel information pathways are separated in the visual hierarchy, with a dorsal pathway being responsible for location or visually guided action, which is known as the “where” pathway or the “how” pathway, and a ventral pathway being responsible for objection recognition, which known as the “what” pathway (Goodale & Milner,1992; Mishkin, Ungerleider, & Macko, 1983). Whereas both the “where” and “what” problems are complex, it seems that more attention is attracted to study the “what” problem than the “where” problem. Research on the "what" problem, ranging from the edge detection (Marr & Hildreth,1980; Zhou, Friedman, & Von Der Heydt, 2000), to surface and shape perception (Nakayama, He, & Shimojo, 1995; Marr & Nishihara, 1978), to object recognition (Riesenhuber, & Poggio, 1999) and face identification (Kanwisher, McDermott, & Chun, 1997; Haxby, Hoffman, & Gobbini, 2000), has dominated vision research in human, animal, and machine. This dominance can be illustrated by the recent zest of applying deep artificial neural network algorithms to solve problems in computer vision and the biological visual systems. Starting with significantly improving computer’s categorization and recognition of objects in pictures (Krizhevsky, Sutskever, & Hinton, 2012), the deep artificial neural network has empowered machines to have great “visual perception” ability: the machine can now detect a face in images as well as a human can do (Taigman, Yang, Ranzato, & Wolf, 2014), and can even describe a picture and its gist with several sentences (Karpathy, & Fei-Fei, 2015). In addition to its wide application in the computer vision research, deep neural network also becomes popular in visual neuroscience research. For example, a parallel comparison is drawn between the representations in the visual brain regions and the representations in a trained deep neural network, which aims to better understand the object recognition process and feature representations in the hierarchical visual brain with the help of algorithms and parameters in the deep neural network (Cichy, Khosla, Pantazis,Torralba, & Oliva, 2016). In the shadow of such great progress and achievements in solving the "what" problem, the answer to the "where" problem, namely, the location of those recognized objects, seems to be a simple by-product -- a bounding box in the image after objects have been identified. In fact, the answers are never trivial for the "where" problem in human visual perception. Instead, it can be really hard to accurately locate an object, both in a 2D plane and in a 3D world. Also, location information could be the foundation, rather than a by-product, for many other visual computations. Real problems in visual perception usually involve both “where” and “what” information. These two pieces of information is usually hard to dissociate, quite unlike the information that are elegantly separated in the two parallel “where” and “what” pathways as proposed by the theoretical models.
 
![Figure1](/assets/img/thesis-figure/figure1.png)

<h3 style="text-align:center">Visual localization is a non-trivial problem</h3>

Human constantly moves around the environment. So do many objects. Thus, objects in the world constantly change its location relative to a human observer. Even if an observer sits down and keeps her body static, her head may constantly turn around to capture information. More frequently, her eyes move around, jumping from one location to another. Between two of such jumps, the eyes only fixate steadily for about only 200ms to 300ms (Rayner, & Castelhano, 2007). The constant movements of the human body, head, and eyes, as well as the motion of objects themselves, lead to frequent changes of retina images in the eyes. Thus, an object can rarely have the same location on the retina to a long time. This fact that objects frequently changes locations on the retina is in sharp contrast with our feeling of a stable and static world. To recover the true locations of those objects thus becomes a big problem. We either have a general representation of the environment that is independent of our own body, such as a world map that records the locations of each country on earth in a static way, or constantly match new locations to old locations with the correction of our own motion displacement, and check whether the locations of objects have changed or not. These demanding computations are prone to mistakes and errors. Either the environment can change dramatically when we relocate to another place, or the estimation of own motion displacement can be inaccurate. Even worse, the location on the retina is not necessarily the location in our perception in the first place, even though there is a topological correspondence between the locations on retina and locations in multiple visual areas in the brain (Silver & Kastner, 2009; Engel, Glover, & Wandell, 1997). Recent psychophysics experiments has demonstrated phenomena that objects are constantly mislocalized in normal people, such as peri-saccadic compression (Ross, Morrone, & Burr, 1997) and motion-induced position shift (Eagleman & Sejnowski, 2007), as well as in neurological deficits patients, such as optic ataxia and William syndrome (Rossetti, Pisella, & Vighetto, 2003; Perenin, & Vighetto, 1988; Landau, & Hoffman, 2012 ).

Even if both a person and the object are stationary, it could still be hard to know the accurate locations of the objects in relation to the person. For example, Cavanagh and his colleagues recently showed that human observers may localize a probe closer to a peripheral anchor than the probe's true location on the screen, when observers kept fixation and both the probe and the anchor never moved (Born, Zimmermann, & Cavanagh, 2015; Zimmermann, Born, Fink, & Cavanagh, 2014). Such fixational compression phenomenon is induced by the brief, noisy presentation of anchor and probe. For example, an anchor, such as a color bar, was presented on the screen for around 100ms, and a full-screen mask appeared on the screen for 100ms immediately after. If a probe is presented briefly within 50ms around the mask’s onset, this probe was perceived to locate closer to the anchor than the probe really was. A mask may not be necessary for this fixational compression if the probe is in low contrast to the background (Born, Krüger, Zimmermann, & Cavanagh, 2016). In addition to errors of locations in 2D planes, the locations in the 3D world are also inaccurate. When the 3D physical world is projected on a 2D retina, most of the depth information is lost. Objects that have independent locations in the 3D world may overlap with each in the projected 2D image, and thus near objects may occlude the further objects. For each of those partially occluded objects, because we cannot have the full view of it, it is hard to know where it actually locates. We may not know the center of the gravity or the bounding box of it because we have no information on the shapes or structures of the occluded part. For example, we see a tall hat has occluded a pair of rabbit ears, but we cannot know whether this partially occluded rabbit is inside the hat, or actually behind the hat. Not even can we make sure what is hidden there, an intact rabbit, or only a pair of rabbit ears. Similarly, the lack of the depth information can prevent a correct understanding of the relative distance between two objects and the observer. When we see a ball in a frame with no further depth cues. We don't know whether this ball is in front of the frame, inside the frame, or actually behind the frame. These ambiguities of depth not only prevent us from calculating the distance in depth but also impair us from understanding the spatial relationships between other objects. It has been shown that people are not good at judging absolute distance of an object and they are inaccurate when the distance is more than 2 to 3 meters (Wu, Ooi, & He, 2004). Thanks to the multiple cues for us to infer the depth of the objects, such as perspective, occlusion, motion parallax, binocular disparity, binocular convergence, and so forth (Palmer, 1999), we may have a good estimation of depth up to 20 meters if rich cues are available, such as a flat terrain (Wu, Ooi, & He, 2004).

<h3 style="text-align:center">Location information is essential for visual computations</h3>

Despite the difficulties of accurately computing a location, having accurate location information is essential in many of visual computations. 

Most neurons in the visual systems only respond to stimulus in a limited region in the visual field. Such responsive regions in the visual field are called the receptive field of those neurons (Palmer, 1999). Neurons in the early visual system have small receptive fields, especially those that process information around the fovea. A neuron in the primary visual cortex of monkey may only have a receptive field of 1 degree in size (Freeman & Simoncelli, 2011; Gattass, Gross, & Sandell, 1981). Human imaging experiments show a similar receptive field size in the human early cortex to those in monkey primary visual cortex. Recent development of the imaging and modeling technique shows that the population receptive field (pRF) for a voxel of the brain, which contains a population of neurons within the region because of the low spatial resolution of functional magnetic resonance imaging technique, in the human primary visual cortex is about 1 degree in visual angle (Dumoulin, & Wandell, 2008). The small size of receptive field means that each neuron can only see a small region of the outside world. But our final visual perception sees a large visual field. Connecting local information that is “seen” by each neuron to form a global perception requires accurate location information of each unit in the large configuration. Novan (1977) has shown that human is very good at perceiving a global pattern that is made of multiple small units. The figure below illustrated such an example. There does not exists a continuous and connected region of the capital letter H. Instead, only multiple small Ss possess different locations in space. We nevertheless perceived the capital letter H without much effort. To perceive the H, we need to have correct locations of its each component, the small Ss. If the perceived spatial layouts, the collections of the locations of each unit, are distorted, the global perception may change, such as becoming a capital letter A, or a Greek letter θ.  

 
![Figure2](/assets/img/thesis-figure/figure2.png)
 
In fact, the location information could be essential for recognition and discrimination of objects. In face recognition, the locations of the elements, such as the eyes, the nose, and the mouth, is important for the correct understanding of the face. The locations of these elements consist statistical regularities, and together form “configurational information” of a face (Tanaka & Farah, 1993). When the locations of the elements are scrambled around, we cannot perceive a face anymore, even though the basic elements are the same. Even when a face is just inverted upside down, where some of the relation locations of basic elements remained intact, our ability to recognize a face is impaired (Yin, 1969), and sometimes we cannot even detect the face is actually distorted when it is inverted, as revealed in the Thatcher effect (Thompson, 1980). 

 
![Figure3](/assets/img/thesis-figure/figure3.png)

For a general object, which usually has multiple parts, the relative locations of its parts can be a key to differentiating one object from another. For example, if a vertical line is on one end of a horizontal line, we perceive a letter L, whereas a vertical line is attached to the middle of a horizontal line, we see a letter T. Chemists who study organic chemistry or biologists who investigate proteins will appreciate the importance of these "local" location information greatly, because many organic compounds and proteins that only have subtle locations differences in their structures can have dramatic differences in their properties and functions. Theories of shape and object recognition all address the location of the parts in relation to the main part of the object, such as the trunk (Marr & Nishihara, 1978; Feldman & Singh, 2006). So, it seems that in every "what" problem, there is a "where" problem.

In addition to the structures of an object, location is also essential for binding multiple features, such as color, orientation, and texture together for each part of the object. The binding problem is treated as one of the most difficult problems in cognition. Its general form concerns the integration of multiple features or dimensions into one single entity (Roskies, 1999). Treisman (1991) categorized seven binding problems: 1) property binding, which binds different properties to one single object that they characterize; 2) part binding, which binds different parts of an object, possibly discontinuous due to occlusions, and separates the object from the background; 3) range binding, which signals a particular value on a property by ratios of activity level in a population of neurons to the to its full range; 4) hierarchical binding, which binds low-level visual properties, such as edge and texture, into mid-level visual property, such as a surface, or a high-level visual object; 5) conditional binding, which interprets one property based on other dependent properties, such as motion and depth; 6) temporal binding, which binds two objects across temporal interval; and 7) location binding, which binds objects to their current locations. Such detailed taxonomy may sometimes be more confusing than helpful and could over-complicate the problems. For example, if property binding (1) can happen without any locations information, then how these “free floating” properties can ever find the right “partner” so that they can bind to each other? Electrophysiology data suggests that properties may not “free float” without location specified, because each neuron in the visual brain only responds to information in a limited region in the visual field, that is, in their receptive field. Even if neurons in the high-level visual areas have a large receptive field, it is not sufficient to say properties are free floating. In contrast, if different properties are bind together because they have common location indices, there is no extra problem of location binding (7) then. The location of objects can be calculated by all the location information of its parts and different properties. Also, for the hierarchical binding (4), how low-level visual properties can bind together to become a mid-level visual property as a surface? This problem is similar to the global perception process that is mentioned above, and we can see location could be important for this sub-problem as well. For temporal binding, we need to have the knowledge of where objects could possibly locate at a different time before we can bind the same objects across time. When such knowledge is ambiguous, the binding results are also ambiguous, as shown in the Ternus effects (Petersik, Rice, 2006).  

The location is also involved in computations of motion perception, especially in perceiving long-range motion signals. In such case, a correspondence computation takes the locations of an object at a different time as inputs, and calculates the motion direction and the speed. When the location input is noisy, or the location perception is impaired, for example the object is crowded by multiple nearby distractors, the motion perception is largely impaired: a moving object may be perceived as static (Ma, Z, McCloskey, & Flombaum, 2015). Recall from our discussion in the last subsection that motion perception can also affect the perception of a location. This interaction between location and motion perception can show the complexity of the “where” problem.
 
There are still other important visual computations that require location information. Visual attention is usually directed to different locations, even if no objects have been presented there (Kastner, Pinsk, De Weerd, Desimone, & Ungerleider, 1999). Many models of visual attention, such as the saliency map model (Itti & Koch, 2000), the zoom lens model (Eriksen, & James, 1986), and many others, concerns location information either as its input or output in the computation. Visually guided action also depends heavily on location information. Understanding the location of an object in space is necessary for reaching to this object. Brain lesions in the dorsal pathway that impair the computations of location information can lead to a failure in reaching the objects, whereas keep the object recognition ability intact (Mishkin, Ungerleider & Macko,1983). 

<h3 style="text-align:center">Understand the locations: two questions of reference frames</h3>

From the short survey above, we can see that it is not trivial to obtain the location information of an object in the world for the visual system. Nor is it a trivial role that location information plays in various kinds of visual computations. Good solutions are needed for the “where” problem in order to have a normal visual perception. But how the visual system obtains such answers still remains unknown. The first step to reveal the computational processes that calculate the location information is to have a clear understanding of a basic problem: the reference frame problem in the location representations. This problem has two main specific questions, which were first explicitly identified by McCloskey (2009). 

The first question is the definition question: in relation to how a location is defined. The answer to this question requires a clear identification of the reference frame within which a location makes sense. It defines the scope of the problem, and it implicitly specifies a spatial relationship when a location is defined. For example, the location of the watch on my left wrist can be defined in the reference frame of the room where I am sitting, or can be defined in the reference frame of my body. The definition of reference frame not only specifies how a location is defined, but also determines whether a location will change or not. If I walk out of the room, the location of the watch will change if the reference frame is room, but its location will not change if the reference frame is my body.  

The second is the format question: in what format a location is specified within a reference frame. The answer to this question requires an understanding of the organization of locations within a reference frame. The answer will also help to understand how location information is calculated and transformed in support for other computations that involve locations. For example, the location of an object on a 2D plane can be represented as a propositional statement of its spatial relationship with another object: the object A is TO THE LEFT of an object B. The location can also be represented using an ordered pair of numbers (a, b) as its coordinates in a coordinate system. For example, in a Cartesian coordinate system, a location can be written as a number pair (x, y) that denotes the location’s horizontal and vertical offsets from the origin point. If a location is represented as a coordinate pair on a 2D plane, we can easily understand how to use such location information to calculate the motion displacement, motion direction, velocity amplitude, and so forth. 

We set out to study how visual system computes the location information in this project, and we will focus on solving these two questions of the reference frame problems. The next two sections will discuss these two questions in details. 
 

<h3 style="text-align:center">Reference of this section</h3>

Cichy, R. M., Khosla, A., Pantazis, D., Torralba, A., & Oliva, A. (2016). Comparison of deep neural networks to spatio-temporal cortical dynamics of human visual object recognition reveals hierarchical correspondence. Scientific reports, 6.

Born, S., Krüger, H. M., Zimmermann, E., & Cavanagh, P. (2016). Compression of space for low visibility probes. Frontiers in systems neuroscience, 10.

Born, S., Zimmermann, E., & Cavanagh, P. (2015). The spatial profile of mask-induced compression for perception and action. Vision research, 110, 128-141.

Dumoulin, S. O., & Wandell, B. A. (2008). Population receptive field estimates in human visual cortex. Neuroimage, 39(2), 647-660.

Eagleman, D. M., & Sejnowski, T. J. (2007). Motion signals bias localization judgments: A unified explanation for the flash-lag, flash-drag, flash-jump, and Frohlich illusions. Journal of vision, 7(4), 3-3.

Engel, S. A., Glover, G. H., & Wandell, B. A. (1997). Retinotopic organization in human visual cortex and the spatial precision of functional MRI. Cerebral cortex, 7(2), 181-192.

Eriksen, C. W., & James, J. D. S. (1986). Visual attention within and around the field of focal attention: A zoom lens model. Perception & psychophysics, 40(4), 225-240.

Feldman, J., & Singh, M. (2006). Bayesian estimation of the shape skeleton. Proceedings of the National Academy of Sciences, 103(47), 18014-18019.

Freeman, J., & Simoncelli, E. P. (2011). Metamers of the ventral stream. Nature neuroscience, 14(9), 1195-1201.

Gattass, R., Gross, C. G., & Sandell, J. H. (1981). Visual topography of V2 in the macaque. Journal of Comparative Neurology, 201(4), 519-539.

Goodale, M.A., & Milner, A.D. (1992). Separate visual pathways for perception and action. Trends in Neurosciences 15(1), 20-25.

Haxby, J. V., Hoffman, E. A., & Gobbini, M. I. (2000). The distributed human neural system for face perception. Trends in cognitive sciences, 4(6), 223-233.

Itti, L., & Koch, C. (2000). A saliency-based search mechanism for overt and covert shifts of visual attention. Vision research, 40(10), 1489-1506.

Kanwisher, N., McDermott, J., & Chun, M. M. (1997). The fusiform face area: a module in human extrastriate cortex specialized for face perception. The Journal of neuroscience, 17(11), 4302-4311.

Kastner, S., Pinsk, M. A., De Weerd, P., Desimone, R., & Ungerleider, L. G. (1999). Increased activity in human visual cortex during directed attention in the absence of visual stimulation. Neuron, 22(4), 751-761.

Karpathy, A., & Fei-Fei, L. (2015). Deep visual-semantic alignments for generating image descriptions. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (pp. 3128-3137).

Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). Imagenet classification with deep convolutional neural networks. In Advances in neural information processing systems (pp. 1097-1105).

Landau, B., & Hoffman, J. E. (2012). Spatial representation: From gene to mind. Oxford University Press.

Ma, Z., McCloskey, M., & Flombaum, J. I. (2015). A deficit perceiving slow motion after brain damage and a parallel deficit induced by crowding. Journal of Experimental Psychology: Human Perception and Performance, 41(5), 1365.

Marr, D., & Hildreth, E. (1980). Theory of edge detection. Proceedings of the Royal Society of London B: Biological Sciences, 207(1167), 187-217.

Marr, D., & Nishihara, H. K. (1978). Representation and recognition of the spatial organization of three-dimensional shapes. Proceedings of the Royal Society of London B: Biological Sciences, 200(1140), 269-294.

McCloskey, M. (2009). Visual reflections: A perceptual deficit and its implications. New York:Oxford University Press.

Mishkin, M., Ungerleider, L.G., & Macko, K.A. (1983). Object vision and spatial vision: two cortical pathways. Trends in Neurosciences 6, 414-417. 

Nakayama, K., He, Z. J., & Shimojo, S. (1995). Visual surface representation: A critical link between lower-level and higher-level vision. Visual cognition: An invitation to cognitive science, 2, 1-70.

Navon, D. (1977). Forest before trees: The precedence of global features in visual perception. Cognitive psychology, 9(3), 353-383.

Palmer, S. E. (1999). Vision science: Photons to phenomenology. MIT press.

Perenin, M. T., & Vighetto, A. (1988). Optic ataxia: a specific disruption in visuomotor mechanisms. Brain, 111(3), 643-674.

Petersik, J. T., & Rice, C. M. (2006). The evolution of explanations of a perceptual phenomenon: A case history using the Ternus effect. Perception, 35(6), 807-821.

Rayner, K., & Castelhano, M. (2007). Eye movements. Scholarpedia, 2(10), 3649.

Riesenhuber, M., & Poggio, T. (1999). Hierarchical models of object recognition in cortex. Nature neuroscience, 2(11), 1019-1025.

Roskies, A. L. (1999). The binding problem. Neuron, 24(1), 7-9.

Ross, J., Morrone, M. C., & Burr, D. C. (1997). Compression of visual space before saccades. Nature, 386(6625), 598-601.

Rossetti, Y., Pisella, L., & Vighetto, A. (2003). Optic ataxia revisited. Experimental Brain Research, 153(2), 171-179.

Silver, M. A., & Kastner, S. (2009). Topographic maps in human frontal and parietal cortex. Trends in cognitive sciences, 13(11), 488-495.

Smith, A. T., Singh, K. D., Williams, A. L., & Greenlee, M. W. (2001). Estimating receptive field size from fMRI data in human striate and extrastriate visual cortex. Cerebral cortex, 11(12), 1182-1190.

Taigman, Y., Yang, M., Ranzato, M. A., & Wolf, L. (2014). Deepface: Closing the gap to human-level performance in face verification. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (pp. 1701-1708).

Tanaka, J. W., & Farah, M. J. (1993). Parts and wholes in face recognition. The Quarterly journal of experimental psychology, 46(2), 225-245.

Thompson, P. (1980). Margaret Thatcher: a new illusion. Perception.

Treisman, A. (1996). The binding problem. Current opinion in neurobiology, 6(2), 171-178.

Ungerleider, L.G., & Haxby, J.V. (1994). "What" and "where" in the human brain. Neurobiology 4, 157-165.

Wu, B., Ooi, T. L., & He, Z. J. (2004). Perceiving distance accurately by a directional process of integrating ground information. Nature, 428(6978), 73-77.

Yin, R. K. (1969). Looking at upside-down faces. Journal of experimental psychology, 81(1), 141.

Zhou, H., Friedman, H. S., & Von Der Heydt, R. (2000). Coding of border ownership in monkey visual cortex. The Journal of Neuroscience, 20(17), 6594-6611.

Zimmermann, E., Born, S., Fink, G. R., & Cavanagh, P. (2014). Masking produces compression of space and time in the absence of eye movements. Journal of neurophysiology, 112(12), 3066-3076.
1- give rating to user 
2-select color of the product and the prouct color will change
3- remove product from cart 
4- add a product to cart 
5-select product type(new /used)

# Assignment2
Meeting Notes

Meeting 1: ( 20th October 2022 )
1) We created the GitHub repo during the 1st Phase of our Project ( Software Testing ) but managed it and gave access to every member to work properly during our 1st Meeting
2) Basic Setup of Project + Tools by every member
3) We were facing issues with using NighWatch along with cucumber 
4) Tried again to work with NighWatch 

Meeting 2: ( 31st October 2022 )
1) We had a meeting with our Instructor regarding the issues related to NightWatch
2) We finanlized to work with Cucumber and Selenium 
3) Discussed our UI Test Cases with each other and with Instructor 

Meeting 3: ( 4th November 2022 )
1) UI Test cased approved by Instructor 
2) Start exploring and working TASK-03
3) Update the TASK-02 side by side for optimization and modularization 

Meeting 4: ( 6th Novemeber 2022 ) 
1) Complete UI Test cases and final commit on GitHub
2) Complete API Test cases and final commit on GitHub
3) Explore the existing UI and API automation framework of your open source project

#TASK-04
In this task We will explain the approach used by ReactStore Front testers and by us and then we will made a sincere comparison between how they did testing and how we did testing
#Testing by ReactStore Front Testers (Jest)
React Store Front Testing: The official testing done in the Reactstore front project is on the JEST and its git repository as well as documentation clearly emphasize that the testing is done throughly and extensively on every conponent of the project. The major components are:
1) Carousal 
2) Menu 
3) Nav
4) Link etc.
The testing is done by following all the principles of modularization e.g Page Object Model (POM), efficient xpaths etc. Even Each component of ReactStore Front further divided into the subcomponent to test every possible functionality of the component. For Example: The component of carousal is further divided into different components as follows and then testing is also done on its subdivided components 
1) Carousal Arrows
2) Carousal Dots
3) Carousal Thumnails
4) Media Carousal etc. 

All of these components and their subcomponents are tested efficiently because of the the strategy of Page Object Model.
# Explanation on how testers test ReactStore front components with the help of Example [CarousalArrows (subcomponent of Carousal)]
it('should render both left arrow and right arrow', () => {
    wrapper = mount(<CarouselArrows count={3} selected={1} setSelected={jest.fn()} />)

    expect(wrapper.find(ChevronLeft)).toExist()
    expect(wrapper.find(ChevronRight)).toExist()
  })

  it('should render only left arrow', () => {
    wrapper = mount(<CarouselArrows count={2} selected={1} setSelected={jest.fn()} />)

    expect(wrapper.find(ChevronLeft)).toExist()
    expect(wrapper.find(ChevronRight)).not.toExist()
  })

  it('should render only right arrow', () => {
    wrapper = mount(<CarouselArrows count={2} selected={0} setSelected={jest.fn()} />)

    expect(wrapper.find(ChevronLeft)).not.toExist()
    expect(wrapper.find(ChevronRight)).toExist()
  })

  it('should append one index when clicking on right arrow', () => {
    const setSelectedMock = jest.fn()

    wrapper = mount(<CarouselArrows count={2} selected={0} setSelected={setSelectedMock} />)

    wrapper.find('.MuiSvgIcon-root').at(getFiberIndex(0)).simulate('click')
    expect(setSelectedMock).toBeCalledWith(1)
  })

  it('should subtract one index when clicking on left arrow', () => {
    const setSelectedMock = jest.fn()

    wrapper = mount(<CarouselArrows count={2} selected={1} setSelected={setSelectedMock} />)

    wrapper.find('.MuiSvgIcon-root').at(getFiberIndex(0)).simulate('click')
    expect(setSelectedMock).toBeCalledWith(0)
  })
  
Explanation: The testers have throughly tested this subcomponent.In the Carousel testing file they are testing carousel arrows to exist but hidden by default. First they are creating a wrapper to mount the carousel div from 'react-storefront/carousel/Carousel'.Then they are finding carousel dots and carousel arrows to exist on the page and then on props etc.
They are testing either it should render only right arrow, left arrow , both right and left arrow , append one index on clicking right arrow, subtracting an index on clicking left arrow. Hence the testers have done quite a good job by testing detailed functionalities.

#Testing by us
We have done UI as well as API testing on ReactStore Front 
#Api Testing 
For Api Testing we have followed the following steps
1) Download the testing environment i-e tool which is JEST
2) Install the necessary dependencies including supertest, database, and bycrypt etc.
3) Write the test by properly getting the api url link and also setting the api authentication
4) Extension to get api url link on chrome are Json Viewer
5) Run the test case on different scenarios
#UI Testing
For UI Testing we have followed the following steps
1) Download the testing environment i-e tools such as Selenium and Cucumber 
2) Install the necessary dependencies including cucumber/pretty-formatter, chai, chromedriver, geckodriver
3) Tried to follow the Page Object Model basics 
4) Write the test case by making appropriate features in Gherkin on cucumber 
5) Run the test case and check the negative test cases as well 

#Comparison between US and ReactStore Front Testers
ReactStore Testers have througly tested the components and also subdivide those components and check every functionality. We on the other hand only check and test the limited functionalities. They have properly followed the principles of modularization. Our code is not perfectly alligned with these principles. 

import { Tabs } from 'flowbite-react'
import React from 'react'
import SimilarityDetails from './SimilarityDetails'

const SidebarTab = () => {
	return (
		<Tabs aria-label="Default tabs" variant="fullWidth">
      <Tabs.Item active title="Overview" >
        <SimilarityDetails />
      </Tabs.Item>
      <Tabs.Item title="Version History" >
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
	)
}

export default SidebarTab
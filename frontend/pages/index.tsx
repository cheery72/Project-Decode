import type { NextPage } from 'next'
import { Grid, GridColumn, Image } from "semantic-ui-react"

// Component
import Data from '../src/component/main/data'
import Explain from '../src/component/main/explain'
import FourPosters from '../src/component/main/fourPosters'

const Home: NextPage = () => {
  return (
    <>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <FourPosters/>
            <Grid centered columns={5}>
              <Data/>
            </Grid>
            <Explain/>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Home

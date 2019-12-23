import React from 'react';
import styled from 'styled-components';

import { Container } from 'styled-minimal';

import { Spin, Typography } from 'antd';

const StyledContainer = styled(Container)`
  align-items: center;
  text-align: center;

  h1,
  a {
    color: #fff;
    line-height: 1;
  }

  a {
    text-decoration: underline;
  }
`;

const { Text } = Typography;

const Splash = () => (
  <StyledContainer layout="fullScreen" verticalPadding>
    <Spin size="large" />
    <Text style={{color: '#2195FF'}}>Loading....</Text>
  </StyledContainer>
);

export default Splash;

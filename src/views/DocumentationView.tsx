import styled from 'styled-components';

import DocumentComponent from '../components/documentation/DocumentComponent';

import DisplayWindow from '../components/generic/DisplayWindow';
import Loading from '../components/generic/Loading';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
    return (
        <Container>
            <div>
                <Title>Documentation</Title>
                <DocumentComponent
                    title="Loading spinner "
                    component={<Loading size="medium" color="#ffa2bf" />}
                    propDocs={[
                        {
                            prop: 'size',
                            description: 'Changes the size of the loading spinner',
                            type: 'string',
                            defaultValue: 'medium',
                        },
                    ]}
                />
                <DocumentComponent
                    title="Display Window "
                    component={<DisplayWindow time={0} />}
                    propDocs={[
                        {
                            prop: 'time',
                            description: 'Displays the Timer in Min and Sec',
                            type: 'number',
                            defaultValue: '0:00',
                        },
                    ]}
                />
            </div>
        </Container>
    );
};

export default Documentation;

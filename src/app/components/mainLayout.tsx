"use client"
import { Layout, Typography } from 'antd';
import MainTable from './table';
import { layoutStyle, headerStyle, contentStyle, footerStyle } from './stylesComponents';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  return (
    <div>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title style={{ color: '#fff', marginTop: '1%' }} level={3}>Prueba técnica de bps&tec</Title>
        </Header>
        <Content style={contentStyle}>
          <MainTable />
        </Content>
        <Footer style={footerStyle}>Luz Mariel Rosario Garcia</Footer>
      </Layout>
    </div>
  );
};
export default MainLayout;

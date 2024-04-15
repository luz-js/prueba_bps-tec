"use client"
import { Layout, Typography } from 'antd';
import MainTable from './table';
import { layoutStyle, headerStyle, contentStyle, footerStyle, titleMainLayout } from './stylesComponents';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

//aqui se está usando ANT DESIGN para el layout
const MainLayout: React.FC = () => {
  return (
    <div>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title style={titleMainLayout} level={3}>Prueba técnica de bps&tec</Title>
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

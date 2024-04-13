"use client"
import { Layout, Typography } from 'antd';
import MainTable from './table';

const { Header, Footer, Sider, Content } = Layout;
const {Title} = Typography;

const headerStyle = {
  textAlign: 'center',
  color: '#f4d58d',
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#0b3954',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#03071e',
  padding: '25px',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#0b3954',
};
const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
  height: '100vh'
};

export default function MainLayout() {
    
    return(

        <div>
            <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Title style={{color: '#fff', marginTop: '1%'}} level={3}>Prueba técnica de bps&tec</Title>
            </Header>
            <Content style={contentStyle}>
                <MainTable />
            </Content>
            <Footer style={footerStyle}>Luz Mariel Rosario Garcia</Footer>
            </Layout>
        </div>
        
    )
}
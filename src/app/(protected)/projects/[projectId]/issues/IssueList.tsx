'use client'
import React, { useEffect, useState } from 'react'
import { Card, Typography } from 'antd';
import { Row, Layout, Col, Button } from 'antd';
import CreateIssueModal from './createIssue'
import ViewIssueModal from './viewIssue';
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useDrag, useDrop } from 'react-dnd';
import { Empty } from 'antd';
import axios from 'axios';
import Stats from "@/components/stats";
import { Space, Modal, Form, Input } from 'antd';
import IssueDetails from '@/components/issues/issueDetails'
import IssueActionForm from '@/components/issues/issueActionForm'
const { TextArea } = Input;
const { Text } = Typography;

const { Title } = Typography;

const { Sider } = Layout

export interface IssueProps {
  id: number,
  title: string,
  description: string,
  status: string
}

export interface ProjectProps {
  id: number,
  name: string,
  description: string,
  issues: Array<IssueProps>
}

const DraggableListItem = ({ item, type, editIssue, handleIssueView }: any) => {

  const [, drag] = useDrag({
    type: '*',
    item: item,
  });

  const cardHeader = <div className='flex text-slate-600 justify-between align-middle'>
    <span>{item.title}</span>
    <span className='flex justify-between align-middle'>
      <FaEdit onClick={() => editIssue(item)} />
      {/* <IoMdEye /> */}
    </span>
  </div>

  return (
    <Card size="small" ref={drag} key={item.id} title={cardHeader} bordered={false} className='min-h-48 my-2 max-h-48' style={{ marginTop: 5, padding: 0 }}>
      <p className='overflow-auto max-h-28 cursor-pointer' onClick={() => handleIssueView(item)}>
        {item.description}
      </p>
    </Card>
  );
};

function IssueList({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<ProjectProps | null>(null)
  const [issues, setIssues] = useState<Array<IssueProps>>([])
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editIssues, setEditIssues] = useState<IssueProps | null>(null)

  const [form] = Form.useForm()

  useEffect(() => {
    fetchIssues();
  }, [])

  const fetchIssues = async () => {
    try {
      try {
        const response = await axios.get(`/api/projects/${projectId}/issues`);
        setProject(response.data)
        setIssues(response.data.issues)
      } catch (e) {
        console.log(e)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleOk = () => {
    fetchIssues();
    setIsModalOpen(false)
    setEditIssues(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditIssues(null)
  }

  const handleCancelView = () => {
    setIsViewModalOpen(false)
    setEditIssues(null)
  }

  const editIssue = (issue: IssueProps) => {
    setEditIssues(issue)
    setIsModalOpen(true)
  }

  const handleIssueView = (issue: IssueProps) => {
    console.log("came")
    setEditIssues(issue)
    // setIsViewModalOpen(true)
  }

  const renderIssueCard = (status: string) => {
    const filteredIssue = issues.filter(issue => issue.status === status)
    if (filteredIssue.length === 0)
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
        <span>
          Drag to add issue
        </span>
      } />;
    return filteredIssue.map((issue) => {
      return <DraggableListItem
        key={issue.id}
        item={issue}
        type={status}
        editIssue={editIssue}
        handleIssueView={handleIssueView}
      />
    })
  }

  const updateStatus = async (status: string, item: IssueProps) => {
    try {
      await axios.patch(`/api/projects/${projectId}/issues/${item.id}/status`, { status: status })
      fetchIssues()
    } catch (e) {
      console.log(e)
    }
  }

  const [, selected] = useDrop({
    accept: '*',
    drop: (item: IssueProps) => {
      updateStatus('SELECTED', item)
    }
  });

  const [, open] = useDrop({
    accept: '*',
    drop: (item: IssueProps) => {
      updateStatus('OPEN', item)
    }
  });

  const [, inprogress] = useDrop({
    accept: '*',
    drop: (item: IssueProps) => {
      updateStatus('IN_PROGRESS', item)
    }
  });

  const [, test] = useDrop({
    accept: '*',
    drop: (item: IssueProps) => {
      updateStatus('TESTING', item)
    }
  });

  const [, close] = useDrop({
    accept: '*',
    drop: (item: IssueProps) => {
      updateStatus('CLOSED', item)
    }
  });

  return (
    <>
      {isModalOpen && <CreateIssueModal issue={editIssues} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />}
      {isViewModalOpen && <ViewIssueModal issue={editIssues} isModalOpen={isViewModalOpen} handleCancel={handleCancelView} />}
      <Row justify={'space-between'} className='pb-4'>
        <Col>
          <Title level={2}>{project?.name}</Title>
        </Col>
        <Col>
          <Button type='primary' onClick={() => setIsModalOpen(true)}>Create Issue</Button>
        </Col>
      </Row>

      <div className="grid grid-cols-7 gap-2 my-8 max-h-40">
        <Stats />
        <div className='col-span-2 border-l-2 px-4'>
          <Card title={project?.name}>
            <p className='overflow-scroll max-h-24'>{project?.description} The Sedin ecosystem is an integrated collaborative of highly specialised divisions. We’re consultants, technologists and entrepreneurs with skin in the game, and create out of the box strategies for your growth.</p>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div ref={selected} style={{ minHeight: '600px' }} className="w-full max-w bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-2 min-h-30 h-30">
          <p className='text-gray-600 font-semibold px-1 py-1 uppercase'>Analysis</p>
          {renderIssueCard('SELECTED')}
        </div>
        <div ref={open} style={{ minHeight: '600px' }} className="w-full max-w bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-2 min-h-30 h-30">
          <p className='text-gray-600 font-semibold px-1 py-1 uppercase'>To do</p>
          {renderIssueCard('OPEN')}
        </div>
        <div ref={inprogress} style={{ minHeight: '600px' }} className="w-full max-w bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-2 min-h-30">
          <p className='text-gray-600 font-semibold px-1 py-1 uppercase'>In Progress</p>
          {renderIssueCard('IN_PROGRESS')}
        </div>
        <div ref={test} style={{ minHeight: '600px' }} className="w-full max-w bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-2 min-h-30">
          <p className='text-gray-600 font-semibold px-1 py-1 uppercase'>Testing</p>
          {renderIssueCard('TESTING')}
        </div>
        <div ref={close} style={{ minHeight: '600px' }} className="w-full max-w bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-2 min-h-30">
          <p className='text-gray-600 font-semibold px-1 py-1 uppercase'>Done</p>
          {renderIssueCard('CLOSED')}
        </div>
        {editIssues && <div className='col-span-2 border-l-2 p-4'>
          <IssueActionForm editIssues={editIssues} />
          <IssueDetails issue={editIssues} />
        </div>}
      </div >
    </>
  )
}

export default IssueList
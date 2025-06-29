import styled from 'styled-components';
import { Slope } from '../../../../apis/slopeMap';
import { useState, useEffect } from 'react';
import { SlopeFormProps } from '../../interface';

const SlopeForm = ({
  titleText,
  initialData,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
}: SlopeFormProps) => {
  const [formData, setFormData] = useState<Slope>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  console.log(formData);
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2> {titleText}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ScrollContainer>
            <Section>
              <SectionTitle>기본 정보</SectionTitle>
              <FormGroup>
                <Label>관리번호</Label>
                <Input
                  type="text"
                  value={formData.managementNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      managementNo: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>급경사지명</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>관리 정보</SectionTitle>
              <FormGroup>
                <Label>시행청명</Label>
                <Input
                  type="text"
                  value={formData.management.organization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      management: {
                        ...formData.management,
                        organization: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>관리주체구분코드</Label>
                <Input
                  type="text"
                  value={formData.management.authority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      management: {
                        ...formData.management,
                        authority: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>소관부서명</Label>
                <Input
                  type="text"
                  value={formData.management.department}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      management: {
                        ...formData.management,
                        department: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>위치 정보</SectionTitle>
              <FormGroup>
                <Label>시도</Label>
                <Input
                  type="text"
                  value={formData.location.province}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        province: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>시군구</Label>
                <Input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>읍면동</Label>
                <Input
                  type="text"
                  value={formData.location.district}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        district: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>상세주소</Label>
                <Input
                  type="text"
                  value={formData.location.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        address: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>도로명상세주소</Label>
                <Input
                  type="text"
                  value={formData.location.roadAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        roadAddress: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>산주소여부</Label>
                <Input
                  type="text"
                  value={formData.location.mountainAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        mountainAddress: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <SubSection>
                <FormGroup>
                  <Label>주지번</Label>
                  <Input
                    type="text"
                    value={formData.location.mainLotNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          mainLotNumber: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>부지번</Label>
                  <Input
                    type="text"
                    value={formData.location.subLotNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          subLotNumber: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
            <Section>
              <SectionTitle>GIS 정보</SectionTitle>
              <SubSectionTitle>GIS좌표시점</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표시점위도도</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLatDegree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLatDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점위도시</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLatMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLatMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점위도초</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLatSecond}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLatSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표시점경도도</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLongDegree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLongDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점경도시</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLongMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLongMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표시점경도초</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.start.startLongSecond}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            start: {
                              ...formData.location.coordinates.start,
                              startLongSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSectionTitle>GIS좌표종점</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표종점위도도</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLatDegree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLatDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점위도시</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLatMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLatMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점위도초</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLatSecond}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLatSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSection>
                <FormGroup>
                  <Label>GIS좌표종점경도도</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLongDegree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLongDegree: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점경도시</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLongMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLongMinute: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>GIS좌표종점경도초</Label>
                  <Input
                    type="text"
                    value={formData.location.coordinates.end.endLongSecond}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          coordinates: {
                            ...formData.location.coordinates,
                            end: {
                              ...formData.location.coordinates.end,
                              endLongSecond: Number(e.target.value),
                            },
                          },
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
            <Section>
              <SectionTitle>안전</SectionTitle>
              <FormGroup>
                <Label>안전점검일련번호</Label>
                <Input
                  type="text"
                  value={formData.inspections.serialNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inspections: {
                        ...formData.inspections,
                        serialNumber: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>안전점검일자</Label>
                <Input
                  type="date"
                  value={
                    formData.disaster.riskDate
                      ? new Date(formData.disaster.riskDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inspections: {
                        ...formData.inspections,
                        date: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>안전점검결과코드</Label>
                <Input
                  type="text"
                  value={formData.inspections.result}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inspections: {
                        ...formData.inspections,
                        result: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>재해위험도</SectionTitle>
              <FormGroup>
                <Label>재해위험도평가일련번호</Label>
                <Input
                  type="text"
                  value={formData.disaster.serialNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disaster: {
                        ...formData.disaster,
                        serialNumber: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가일자</Label>
                <Input
                  type="date"
                  value={
                    formData.disaster.riskDate
                      ? new Date(formData.disaster.riskDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disaster: {
                        ...formData.disaster,
                        riskDate: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가등급코드</Label>
                <Input
                  type="text"
                  value={formData.disaster.riskLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disaster: {
                        ...formData.disaster,
                        riskLevel: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가점수합계</Label>
                <Input
                  type="text"
                  value={formData.disaster.riskScore}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disaster: {
                        ...formData.disaster,
                        riskScore: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>재해위험도평가종류코드</Label>
                <Input
                  type="text"
                  value={formData.disaster.riskType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      disaster: {
                        ...formData.disaster,
                        riskType: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>붕괴위험지구</SectionTitle>
              <FormGroup>
                <Label>붕괴위험지구번호</Label>
                <Input
                  type="text"
                  value={formData.collapseRisk.districtNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collapseRisk: {
                        ...formData.collapseRisk,
                        districtNo: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>붕괴위험지구명</Label>
                <Input
                  type="text"
                  value={formData.collapseRisk.districtName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collapseRisk: {
                        ...formData.collapseRisk,
                        districtName: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>붕괴위험지구지정여부</Label>
                <Input
                  type="checkbox"
                  checked={formData.collapseRisk.designated}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collapseRisk: {
                        ...formData.collapseRisk,
                        designated: e.target.checked,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>붕괴위험지구지정일자</Label>
                <Input
                  type="date"
                  value={
                    formData.collapseRisk.designationDate
                      ? new Date(formData.collapseRisk.designationDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collapseRisk: {
                        ...formData.collapseRisk,
                        designationDate: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>정비사업</SectionTitle>
              <FormGroup>
                <Label>정비사업유형코드</Label>
                <Input
                  type="text"
                  value={formData.maintenanceProject?.type || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maintenanceProject: {
                        ...formData.maintenanceProject,
                        type: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>정비사업유형년도</Label>
                <Input
                  type="text"
                  value={formData.maintenanceProject?.year || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maintenanceProject: {
                        ...formData.maintenanceProject,
                        year: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>급경사지 일제조사</SectionTitle>
              <FormGroup>
                <Label>SMC번호(급경사지일제조사이력번호)</Label>
                <Input
                  type="text"
                  value={formData.slopeInspectionHistory.historyNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slopeInspectionHistory: {
                        ...formData.slopeInspectionHistory,
                        historyNumber: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>일제조사일자</Label>
                <Input
                  type="date"
                  value={
                    formData.slopeInspectionHistory.inspectionDate
                      ? new Date(formData.slopeInspectionHistory.inspectionDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slopeInspectionHistory: {
                        ...formData.slopeInspectionHistory,
                        inspectionDate: new Date(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
            </Section>
            <Section>
              <SectionTitle>급경사지 정보</SectionTitle>
              <FormGroup>
                <Label>비탈면용도</Label>
                <Input
                  type="text"
                  value={formData.priority.usage || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: {
                        ...formData.priority,
                        usage: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>자연/인공 구분</Label>
                <Input
                  type="text"
                  value={formData.priority.slopeNature || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: {
                        ...formData.priority,
                        slopeNature: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>비탈면유형</Label>
                <Input
                  type="text"
                  value={formData.priority.slopeStructure || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: {
                        ...formData.priority,
                        slopeStructure: e.target.value,
                      },
                    })
                  }
                />
              </FormGroup>
              <SubSectionTitle>급경사지 수치</SubSectionTitle>

              <SubSection>
                <FormGroup>
                  <Label>최고수직고</Label>
                  <Input
                    type="text"
                    value={formData.priority.maxVerticalHeight || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: {
                          ...formData.priority,
                          maxVerticalHeight: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>종단길이</Label>
                  <Input
                    type="text"
                    value={formData.priority.longitudinalLength || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: {
                          ...formData.priority,
                          longitudinalLength: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>평균경사</Label>
                  <Input
                    type="text"
                    value={formData.priority.averageSlope || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: {
                          ...formData.priority,
                          averageSlope: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
              <SubSectionTitle>경사지 등급</SubSectionTitle>
              <SubSection>
                <FormGroup>
                  <Label>점수</Label>
                  <Input
                    type="text"
                    value={formData.priority.Score || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: {
                          ...formData.priority,
                          Score: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label>등급</Label>
                  <Input
                    type="text"
                    value={formData.priority.grade || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: {
                          ...formData.priority,
                          grade: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </SubSection>
            </Section>
          </ScrollContainer>

          <ButtonGroup>
            <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SlopeForm;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};

  h2 {
    margin: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.grey[900]};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 12px;
  padding-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[400]};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey[900]};
  margin: 0 0 16px 0;
`;
const SubSectionTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[900]};
  margin: 20px 0 16px 0;
  font-weight: bold;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #24478f;
    box-shadow: 0 0 0 2px rgba(36, 71, 143, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
`;
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SubmitButton = styled(Button)`
  background: #24478f;
  color: white;
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;

const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;

const CancelButton = styled(Button)`
  background: white;
  color: ${({ theme }) => theme.colors.grey[700]};
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};

  &:hover {
    background: ${({ theme }) => theme.colors.grey[50]};
  }
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.grey[500]};

  &:hover {
    color: ${({ theme }) => theme.colors.grey[700]};
  }
`;

import styled from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

export const Glass = styled.div`
  backdrop-filter: blur(3px);
  padding: 8px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 1000px;
  background: rgba(255, 255, 255, 0.7);

  > svg {
    color: rgba(0, 0, 0, 0.2);
    font-size: 28px;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0 2px;
`;

export const DescContainer = styled.div`
  display: flex;
  font-size: 12px;
`;

export default function TestComponent() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'red',
      color: 'white',
      fontSize: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      TEST COMPONENT IS RENDERING
    </div>
  );
}
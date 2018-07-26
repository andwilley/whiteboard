import * as React from 'react';

const withPropsChecker = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class PropsChecker extends React.Component<P> {
    componentWillReceiveProps(nextProps: any) {
      Object.keys(nextProps)
        .filter(key => {
          return nextProps[key] !== this.props[key];
        })
        .map(key => {
          console.log(
            'changed property:',
            key,
            'from',
            this.props[key],
            'to',
            nextProps[key]
          );
        });
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withPropsChecker;

import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 监听页面滚动，控制按钮的显示与隐藏
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // 显示按钮
    } else {
      setIsVisible(false); // 隐藏按钮
    }
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="scroll-to-top-button"
        aria-label="Back to top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;

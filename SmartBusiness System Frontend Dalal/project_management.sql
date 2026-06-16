-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2026 at 12:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--
#انشاء جدول الموظفين الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، user_id (مفتاح خارجي يشير إلى جدول المستخدمين)، full_name (الاسم الكامل للموظف)، phone (رقم الهاتف)، position (الوظيفة)
CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--
#إدراج بيانات تجريبية في جدول الموظفين، حيث يتم ربط كل موظف بمستخدم معين من جدول المستخدمين باستخدام user_id، ويتم تحديد الاسم الكامل ورقم الهاتف والوظيفة لكل موظف
INSERT INTO `employees` (`id`, `user_id`, `full_name`, `phone`, `position`) VALUES
(1, 2, 'Sami', '111111111', 'Project Manager'),
(2, 3, 'Haiva', '222222222', 'Backend Developer'),
(3, 3, 'Ola', '3333333333', 'Database Design'),
(4, 3, 'Dalal', '444444444', 'Frontend Developer'),
(5, 3, 'Diana', '555555555', 'UI');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--
#انشاء جدول الصلاحيات الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، name (اسم الصلاحية)
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--
#إدراج بيانات تجريبية في جدول الصلاحيات، حيث يتم تحديد اسم كل صلاحية مثل إنشاء مشروع، تحرير مشروع، حذف مشروع، إنشاء مهمة، تحديث مهمة، وعرض التقارير
INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'create_project'),
(4, 'create_task'),
(3, 'delete_project'),
(2, 'edit_project'),
(5, 'update_task'),
(6, 'view_reports');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--
#انشاء جدول المشاريع الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، name (اسم المشروع)، description (وصف المشروع)، start_date (تاريخ بدء المشروع)، end_date (تاريخ انتهاء المشروع)ًًًً
CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--
#إدراج بيانات تجريبية في جدول المشاريع، حيث يتم تحديد اسم المشروع ووصفه وتواريخ البدء والانتهاء لكل مشروع
INSERT INTO `projects` (`id`, `name`, `description`, `start_date`, `end_date`) VALUES
(1, 'ERP System', 'Management System', '2026-05-01', '2026-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--
#انشاء جدول التقارير الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، title (عنوان التقرير)، content (محتوى التقرير)، project_id (مفتاح خارجي يشير إلى جدول المشاريع)، created_by (مفتاح خارجي يشير إلى جدول المستخدمين)، created_at (تاريخ ووقت إنشاء التقرير)
CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--
#إدراج بيانات تجريبية في جدول التقارير، حيث يتم تحديد عنوان التقرير ومحتواه وربطه بمشروع معين من جدول المشاريع باستخدام project_id، وتحديد المستخدم الذي أنشأ التقرير باستخدام created_by، وتعيين تاريخ ووقت إنشاء التقرير إلى الوقت الحالي
INSERT INTO `reports` (`id`, `title`, `content`, `project_id`, `created_by`, `created_at`) VALUES
(1, 'Weekly Report', 'Project is progressing well', 1, 2, '2026-05-19 12:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--
#انشاء جدول الأدوار الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، name (اسم الدور)
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--
#إدراج بيانات تجريبية في جدول الأدوار، حيث يتم تحديد اسم كل دور مثل المسؤول، المدير، والموظف
INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(3, 'Employee'),
(2, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--
#انشاء جدول صلاحيات الأدوار الذي يحتوي على الحقول التالية: role_id (مفتاح خارجي يشير إلى جدول الأدوار)، permission_id (مفتاح خارجي يشير إلى جدول الصلاحيات)، مع تعيين المفتاح الأساسي المركب على الحقلين role_id و permission_id
CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_permissions`
--
#إدراج بيانات تجريبية في جدول صلاحيات الأدوار، حيث يتم ربط كل دور بمجموعة من الصلاحيات باستخدام role_id و permission_id، على سبيل المثال، المسؤول لديه جميع الصلاحيات، المدير لديه صلاحيات إنشاء وتحرير وحذف المشاريع وإنشاء وتحديث المهام وعرض التقارير، والموظف لديه صلاحيات إنشاء وتحديث المهام وعرض التقاريرًًًً
INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(2, 6),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--
#انشاء جدول المهام الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، title (عنوان المهمة)، description (وصف المهمة)، status_id (مفتاح خارجي يشير إلى جدول حالة المهام)، project_id (مفتاح خارجي يشير إلى جدول المشاريع)، employee_id (مفتاح خارجي يشير إلى جدول الموظفين)
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--
#إدراج بيانات تجريبية في جدول المهام، حيث يتم تحديد عنوان المهمة ووصفها وربطها بحالة معينة من جدول حالة المهام باستخدام status_id، وربطها بمشروع معين من جدول المشاريع باستخدام project_id، وتحديد الموظف المسؤول عن المهمة باستخدام employee_id
INSERT INTO `tasks` (`id`, `title`, `description`, `status_id`, `project_id`, `employee_id`) VALUES
(1, 'Design UI', 'Create homepage design', 1, 1, 5),
(2, 'Database Setup', 'Create all tables', 2, 1, 3),
(3, 'API Development', 'Build backend APIs', 2, 1, 2),
(4, 'Front Development ', 'Build Frontend', 1, 1, 4),
(5, 'Testing System', 'Test all features', 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `task_status`
--
#انشاء جدول حالة المهام الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، name (اسم حالة المهمة)
CREATE TABLE `task_status` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_status`
--
#إدراج بيانات تجريبية في جدول حالة المهام، حيث يتم تحديد اسم كل حالة مثل محظورة، منجزة، قيد التنفيذ، وللعمل
INSERT INTO `task_status` (`id`, `name`) VALUES
(4, 'Blocked'),
(3, 'Done'),
(2, 'In Progress'),
(1, 'To Do');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
#انشاء جدول المستخدمين الذي يحتوي على الحقول التالية: id (المفتاح الأساسي)، username (اسم المستخدم)، email (البريد الإلكتروني)، password (كلمة المرور)، role_id (مفتاح خارجي يشير إلى جدول الأدوار)
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
#إدراج بيانات تجريبية في جدول المستخدمين، حيث يتم تحديد اسم المستخدم والبريد الإلكتروني وكلمة المرور لكل مستخدم، وربط كل مستخدم بدور معين من جدول الأدوار باستخدام role_id، على سبيل المثال، المسؤول لديه دور المسؤول، المدير لديه دور المدير، والموظف لديه دور الموظف
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`) VALUES
(1, 'Admin', 'admin@svuonline.org', '123456', 1),
(2, 'Manager', 'manager@svuonline.org', '123456', 2),
(3, 'Employee', 'employee@svuonline.org', '123456', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
#إضافة المفتاح الأساسي على حقل id في جدول الموظفين، وإضافة مفتاح ثانوي على حقل user_id لزيادة سرعة الاستعلامات التي تعتمد على هذا الحقل
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
#إضافة المفتاح الأساسي على حقل id في جدول الصلاحيات، وإضافة مفتاح فريد على حقل name لضمان عدم تكرار أسماء الصلاحيات
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `projects`
--
#إضافة المفتاح الأساسي على حقل id في جدول المشاريع لزيادة سرعة الاستعلامات التي تعتمد على هذا الحقل
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
#إضافة المفتاح الأساسي على حقل id في جدول التقارير، وإضافة مفاتيح ثانوية على حقول project_id و created_by لزيادة سرعة الاستعلامات التي تعتمد على هذه الحقول
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `roles`
--
#إضافة المفتاح الأساسي على حقل id في جدول الأدوار، وإضافة مفتاح فريد على حقل name لضمان عدم تكرار أسماء الأدوار
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `role_permissions`
--
#إضافة المفتاح الأساسي المركب على الحقول role_id و permission_id في جدول صلاحيات الأدوار لضمان عدم تكرار نفس الصلاحية لنفس الدور، وإضافة مفتاح ثانوي على حقل permission_id لزيادة سرعة الاستعلامات التي تعتمد على هذا الحقل
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `tasks`
--
#إضافة المفتاح الأساسي على حقل id في جدول المهام، وإضافة مفاتيح ثانوية على حقول status_id و project_id و employee_id لزيادة سرعة الاستعلامات التي تعتمد على هذه الحقول
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `task_status`
--
#إضافة المفتاح الأساسي على حقل id في جدول حالة المهام، وإضافة مفتاح فريد على حقل name لضمان عدم تكرار أسماء حالات المهام
ALTER TABLE `task_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
#إضافة المفتاح الأساسي على حقل id في جدول المستخدمين، وإضافة مفتاح فريد على حقل email لضمان عدم تكرار عناوين البريد الإلكتروني، وإضافة مفتاح ثانوي على حقل role_id لزيادة سرعة الاستعلامات التي تعتمد على هذا الحقل
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
#تعديل حقل id في جدول الموظفين ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 6 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `projects`
--
#تعديل حقل id في جدول المشاريع ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 2 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reports`
--
#تعديل حقل id في جدول التقارير ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 2 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
#تعديل حقل id في جدول الأدوار ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 4 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasks`
--
#تعديل حقل id في جدول المهام ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 6 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `task_status`
--
#تعديل حقل id في جدول حالة المهام ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 13 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `task_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
#تعديل حقل id في جدول المستخدمين ليكون AUTO_INCREMENT، وتعيين القيمة الابتدائية للعد التلقائي إلى 5 لضمان استمرار العد من الرقم التالي بعد آخر إدراج
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
#إضافة قيد المفتاح الخارجي على حقل user_id في جدول الموظفين، يشير إلى حقل id في جدول المستخدمين، مع تعيين خيار الحذف CASCADE لحذف الموظف تلقائيًا عند حذف المستخدم المرتبط به
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
#إضافة قيد المفتاح الخارجي على حقل project_id في جدول التقارير، يشير إلى حقل id في جدول المشاريع، مع تعيين خيار الحذف CASCADE لحذف التقرير تلقائيًا عند حذف المشروع المرتبط به، وإضافة قيد المفتاح الخارجي على حقل created_by في جدول التقارير، يشير إلى حقل id في جدول المستخدمين، مع تعيين خيار الحذف SET NULL لتعيين قيمة created_by إلى NULL عند حذف المستخدم المرتبط به
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `role_permissions`
--
#إضافة قيد المفتاح الخارجي على حقل role_id في جدول صلاحيات الأدوار، يشير إلى حقل id في جدول الأدوار، مع تعيين خيار الحذف CASCADE لحذف صلاحية الدور تلقائيًا عند حذف الدور المرتبط به، وإضافة قيد المفتاح الخارجي على حقل permission_id في جدول صلاحيات الأدوار، يشير إلى حقل id في جدول الصلاحيات، مع تعيين خيار الحذف CASCADE لحذف صلاحية الدور تلقائيًا عند حذف الصلاحية المرتبطة به
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
#إضافة قيد المفتاح الخارجي على حقل status_id في جدول المهام، يشير إلى حقل id في جدول حالة المهام، مع تعيين خيار الحذف SET NULL لتعيين قيمة status_id إلى NULL عند حذف حالة المهمة المرتبطة بها، وإضافة قيد المفتاح الخارجي على حقل project_id في جدول المهام، يشير إلى حقل id في جدول المشاريع، مع تعيين خيار الحذف CASCADE لحذف المهمة تلقائيًا عند حذف المشروع المرتبط به، وإضافة قيد المفتاح الخارجي على حقل employee_id في جدول المهام، يشير إلى حقل id في جدول الموظفين، مع تعيين خيار الحذف SET NULL لتعيين قيمة employee_id إلى NULL عند حذف الموظف المرتبط به
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `task_status` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
#إضافة قيد المفتاح الخارجي على حقل role_id في جدول المستخدمين، يشير إلى حقل id في جدول الأدوار، مع تعيين خيار الحذف SET NULL لتعيين قيمة role_id إلى NULL عند حذف الدور المرتبط به
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
